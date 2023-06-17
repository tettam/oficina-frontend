import { useEffect, useRef, useState } from 'react';
import { Buttons } from '../components/Buttons';
import * as C from './styles/commonStyle';
import * as S from './styles/budgetStyle';

import { Toast } from 'primereact/toast';
import { InputText } from 'primereact/inputtext';
import { Dialog } from 'primereact/dialog';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { classNames } from 'primereact/utils';

import { BudgetService } from '../service/BudgetService';
import { ClientService } from '../service/ClientService';
import MenuMobile from '../components/MenuMobile';

const Budget = () => {
  let newObject = {
    client:{id:'',name:''},
    entryDate:'',
    milageVehicle:'',
    observation:'',
    vehicle:{id:'', licensePlate:''},
    items:[]
  }

  const [objects , setObjects] = useState(null);
  const [object , setObject] = useState(newObject);
  const [selectedClient , setSelectedClient] = useState(null);
  const [filterClient , setFilterClient] = useState([]);
  const [clients , setClients] = useState(null)
  const [filterVehicle , setFilterVehicle] = useState([]);
  const [selectedVehicle , setSelectedVehicle] = useState([]);
  const [dialogCreated , setDialogCreated] = useState(false);
  const [submitted , setSubmitted] = useState(false);
  const [visible , setVisible] = useState(false);
  const [error , setError] = useState(null);
  const budgetService = new BudgetService()
  const clientService = new ClientService()


  const handleClickNewObj = () => {
    setDialogCreated(true);
  }
  
  const buttons = new Buttons();
  const newButton = buttons.newObject("Novo Orçamento" , handleClickNewObj);
  const toast = useRef(null)
  const name = 'Orçamento';

  useEffect(() => {
    fechDataClient();
  }, [clients]);
  useEffect(() => {
    fetchData();
  }, [objects])

  const fetchData = async () => {
    if(objects == null) {
      const response = await budgetService.findAll()
      setObjects(response.data)
    }
  }
  const fechDataClient = async () => {
    if(clients == null){
      const response = await clientService.findAll();
      setClients(response.data)
    }
  }

  const searchClient = (event) => {
    const client = clients.filter((item) => {
      return item.name.toLowerCase().startsWith(event.query.toLowerCase())
    })
    setFilterClient(client)
  }

  const searchVehicle = () => {
    const listVehiclesClient = (selectedClient.vehicles);
    return (filterVehicle.length !== 0) 
      ? setFilterVehicle([]) 
      : setFilterVehicle(listVehiclesClient); 
  }
  

  const handleSelectedClient = (event) => {
    const _object = { ...object };
    _object.client.id = event.id;
    _object.client.name = event.name
    setSelectedClient(event);
    setObject(_object);
  }

  const handleSelectedVehicle = (event) => {
    const _object = { ...object };
    _object.vehicle.id = event.id
    _object.vehicle.licensePlate = event.licensePlate;
    setSelectedVehicle(event);
    setObject(_object);
  }


  const deleteObject = async (obj) => {
    if(obj.id) {
      try {
        await budgetService.delete(obj.id).then(() => {
          toast.current.show({severity:'success', summary: 'Sucesso', detail:'Excluído com sucesso!!', life: 3000});
          setObjects(null)
        })
      } catch (error) {
        setError("Erro ao excluir. Tente novamente")
        toast.current.show({severity:'error', summary: 'Erro', detail:'Erro ao excluir', life: 3000});
        setObjects(null)
      }
    }
  }

  const dialogSave = async () => {
    setSubmitted(true)
    if(object.client.id && object.vehicle.id && object.milageVehicle){
      let _object = {...object}
      if(object.id){
        try {
          await budgetService.update(object).then(() => {
            toast.current.show({severity:'success', summary: 'Sucesso', detail:'Alterado com sucesso!!', life: 3000});
            resetDialog()
          })
        } catch (error) {
          setError("Erro ao editar. Tente novamente")
          toast.current.show({severity:'error', summary: 'Erro', detail:'Erro ao editar', life: 3000});
          resetDialog()
        }
      } else {
        try {

          await budgetService.insert(_object).then(() => {
            toast.current.show({severity:'success', summary: 'Sucesso', detail:'Adicionado com sucesso!!', life: 3000});
            resetDialog()
          })
          
        } catch (error) {
          setError("Erro ao cadastrar. Tente novamente")
          toast.current.show({severity:'error', summary: 'Erro', detail:'Erro ao cadastrar', life: 3000});
          resetDialog()
        }
      }
    }

  }

  const resetDialog = () => {
    setObjects(null)
    setSelectedClient(null)
    setSelectedVehicle(null)
    setDialogCreated(false)
    setObject(newObject)
  }

  const footerContentDialog = () => {
    return (
      <>
        <Button label="Salvar" severity="success" text raised onClick={dialogSave} />
        <Button label="Cancelar" severity="danger" text  raised onClick={dialogCancel}/>
      </>
    )
  }

  const dialogCancel = () => {
    setObject(newObject)
    setDialogCreated(false)
    setSelectedClient(null)
    setSelectedVehicle(null)
  }

  const editObject = (obj) => {
    let editObj = { ...obj  }
    setSelectedClient(editObj.client)
    setSelectedVehicle(editObj.vehicle)
    setObject(editObj)
    setDialogCreated(true)
  }

  const actionBodyTemplate = (rowData) => {
    return (
      <>
        <C.StyledButtonsActions style={{ backgroundColor: '#4169e1', marginBottom: '10px' }} onClick={() => editObject(rowData)}>
        <i className="pi pi-pencil"></i>
        </C.StyledButtonsActions>
        <C.StyledButtonsActions style={{ backgroundColor: 'red' }} onClick={() => deleteObject(rowData)}>
        <i className="pi pi-trash"></i>
        </C.StyledButtonsActions>
      </>
    )
  }

  const formatPrice = (value) => {
    return value.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'});
  }

  const onInputChange = (e, name) => {
    let tempValue = e.value

    if(name ==  'milageVehicle'){
      tempValue = tempValue.replace(',','.')
    }
    
    let _object = { ...object };
    _object[`${name}`] = tempValue;
    setObject(_object);
  }

  const handleToggleSidebar = () => {
    setVisible(!visible);
  }
  
  return(
    <>
      <C.Container>
        <C.Header>
        <div className="show-btn-mobile">
          <Button onClick={handleToggleSidebar} className='btn-mobile'>
          <i className="pi pi-bars"></i>
          </Button>
          <MenuMobile visible={visible} onHide={() => setVisible(false)}/>
        </div>
        
          <h3>{name.toUpperCase()}</h3>     
          <span className="p-input-icon-left">
            <i className="pi pi-search" />
            <InputText placeholder={`Pesquisa rápida`} />
          </span>
        </C.Header>

        <Toast ref={toast} />
        <C.ContainerButton>
          {newButton}
        </C.ContainerButton>

        <div>
          <C.StyledDataTable 
            value={objects} 
            paginator rows={5} 
            rowsPerPageOptions={[5, 10, 25, 50]}
            emptyMessage="Não há cadastro">
              <Column field="id" header="O.S." style={{ width: '10%' }}  body={(rowData) => `${rowData.id ?? ''}`}></Column>
              

              <Column field="client" header="Veículo"  body={(rowData) => `${rowData.vehicle.licensePlate ?? ''}`}></Column>
              
              <Column field="pentryDate" header="Data"  body={(rowData) => `${rowData.entryDate ?? ''}`}></Column>

              <Column field="status" header="Status"  body={(rowData) => `${rowData.status ?? ''}`}></Column>
  
              <Column field='price' header="Valor Total" body={(rowData) => `${formatPrice(rowData.price ? rowData.price : '')}`} />
            <Column  body={actionBodyTemplate} style={{ width: '12%' }}></Column>

          </C.StyledDataTable>
        </div>
      </C.Container>
      

      <Dialog header="Detalhes do Orçamento" 
        modal className='p-fluid' 
        visible={dialogCreated} 
        style={{ width: '450px' }} 
        onHide={dialogCancel} 
        footer={footerContentDialog}
        >

        <C.StyledField className="field">         
          <label htmlFor="name">Cliente</label>
          <S.StyledAutoComplete
            autoFocus
            field='name'
            value={selectedClient} 
            suggestions={filterClient ?? []} 
            completeMethod={searchClient}
            onChange={(e) => handleSelectedClient(e.value)}
            className={classNames({'p-invalid' : submitted && !object.client.id})}/>     
            {submitted && !object.client.id && <small className='p-invalid'> *Campo obrigatório</small>}        
        </C.StyledField>

        <C.StyledField className="field">         
          <label htmlFor="name">Veículo</label>
          <S.StyledAutoComplete
            field='licensePlate'
            value={selectedVehicle}
            placeholder='Selecione o veículo'
            suggestions={filterVehicle} 
            completeMethod={searchVehicle} 
            onChange={(e) => handleSelectedVehicle(e.value)} dropdown
            className={classNames({'p-invalid' : submitted && !object.vehicle.id})}/>
            {submitted && !object.vehicle.id && <small className='p-invalid'> *Campo obrigatório</small>}                  
        </C.StyledField> 
         
        <C.StyledField className="field">
          <label htmlFor="name">Quilometragem do veículo</label>
          <C.StyledInput 
            value={object.milageVehicle}
            id="milageVehicle"
            onChange={(e) => onInputChange(e.target, 'milageVehicle')}
            className={classNames({'p-invalid' : submitted && !object.milageVehicle})}/>
            {submitted && !object.milageVehicle && <small className='p-invalid'> *Campo obrigatório</small>}
        </C.StyledField>


        <C.StyledField className="field">
          <label htmlFor="name">Observações</label>
          <S.StyledInputTextarea autoResize 
          value={object.observation} 
          maxLength={120}
          rows={4} cols={30}
          id="observation"
          onChange={(e) => onInputChange(e.target, 'observation')}/>
        </C.StyledField> 

      </Dialog>
    </>
  )
}

export default Budget;