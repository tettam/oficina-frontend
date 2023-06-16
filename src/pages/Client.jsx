import { useEffect, useRef, useState } from 'react';
import * as C from './styles/commonStyle';
import * as S from './styles/clientStyle';
import {Buttons} from '../components/Buttons';


import { Dialog } from 'primereact/dialog';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';


import { ViaCepService } from '../service/api/ViaCepService';
import { ClientService } from '../service/ClientService';
import { VehicleService } from '../service/VehicleService';
import { classNames } from 'primereact/utils';
import MenuMobile from '../components/MenuMobile';

export const Client = () => {
  let newObject = {
    name: '',
    phone:'',
    zipCode:'',
    address:'',
    cityState:'',
    complementAddress:''
  }

  let newVehicle = {
    client:{id:''},
    licensePlate:'',
    carModelData:'',
    color:''
  }

  const handleClickNewObj = () => setDialogCreated(true);
  const handLeClickNewVehicle = () => setDialogCreatedVehicle(true);
  
  const [error , setError] = useState(null)
  const service = new ClientService();
  const apiCep = new ViaCepService();
  const vehicleService = new VehicleService();
  const [submitted, setSubmitted] = useState(false);
  const [visible , setVisible] = useState(false);
  //Clients
  const [objects , setObjects] = useState(null);
  const [object , setObject] = useState(newObject);
  const [dialogCreated , setDialogCreated] = useState(false);
  //Vehicle
  const [vehicle , setVehicle] = useState(newVehicle);
  const [dialogCreatedVehicle, setDialogCreatedVehicle] = useState(false);
  const [selectedClient , setSelectedClient] = useState(null);
  const [filterClient , setFilterClient] = useState([]);

  //Components
  const buttons = new Buttons();
  const newButton = buttons.newObject("Novo Cliente" , handleClickNewObj);
  const buttonVehicle = buttons.newObject("Adicionar Veículo", handLeClickNewVehicle);
  const toast = useRef(null);
  const name = 'Clientes';

  useEffect(() => {
    fetchData();
  }, [objects]);

  const fetchData = async () => {
    if(objects == null) {
      const response = await service.findAll();
      setObjects(response.data);
    }
  }

  const nameBodyTemplate = (rowdata) => {
    return (
      <>
        <span className="p-column-title">Nome</span>
        {rowdata.name}
      </>
    )
  }

  const dialogSave = async () => {
    setSubmitted(true);
    if(object.name.trim() && object.phone){
      let _object = {...object}
      if(object.id){
        try {
          await service.update(object).then(response => {
            toast.current.show({severity:'success', summary: 'Sucesso', detail:'Alterado com sucesso!!', life: 3000});
            setObjects(null);
          })
        } catch (error) {
          setError("Erro ao editar. Tente novamente")
          toast.current.show({severity:'error', summary: 'Erro', detail:'Erro ao editar', life: 3000});
          setObjects(null)
        }
        setDialogCreated(false)
        setObject(newObject)
      } else {
        try {
          await service.insert(_object).then(response => {
            toast.current.show({severity:'success', summary: 'Sucesso', detail:'Adicionado com sucesso!!', life: 3000});
            setObjects(null)
          })
      
        } catch (error) {
          setError("Erro ao cadastrar. Tente novamente")
          toast.current.show({severity:'error', summary: 'Erro', detail:'Erro ao cadastrar', life: 3000});
          setObjects(null)
        }
        setDialogCreated(false)
        setObject(newObject)
      }
    }
  }

  const dialogCancel = () => {
    setObject(newObject)
    setDialogCreated(false)
    setSubmitted(false);
  }

  const editObject = (obj) => {
    let editObj = { ...obj  }
    setObject(editObj)
    setDialogCreated(true)
  }

  const deleteObject = async (obj) => {
    if(obj.id) {
      try {
        await service.delete(obj.id).then(response => {
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

  const onInputChange = (e, name) => {
    let tempValue =  e.value
    let _object = { ...object}
    _object[`${name}`] = tempValue
    setObject(_object) 
      
  }

  const footerContentDialog = () => {
    return (
      <>
        <Button label="Salvar" severity="success" text raised onClick={dialogSave} />
        <Button label="Cancelar" severity="danger" text  raised onClick={dialogCancel}/>
      </>
    )
  }

  const actionBodyTemplate = (rowData) => {
    return (
      <>
        <C.StyledButtonsActions style={{ backgroundColor: '#4169e1' }} onClick={() => editObject(rowData)}>
        <i className="pi pi-pencil"></i>
        </C.StyledButtonsActions>
        <C.StyledButtonsActions style={{ backgroundColor: 'red' }} onClick={() => deleteObject(rowData)}>
        <i className="pi pi-trash"></i>
        </C.StyledButtonsActions>
      </>
    )
  }

  //Request API
  const requestApiViaCep = async (e) => {
    const cep = e.value.replace(/[^0-9]/g, '')
    if(cep.length !== 8){
      const updateAddress = {...object, zipCode:'',address:'', cityState:''}
      setObject(updateAddress)
      return;
    }
    try {
      const response = await apiCep.findZipCode(cep);
      const {cep:zipCode, logradouro: address, localidade, uf } = response.data;
      let updateObject = {...object, zipCode, address, cityState:`${localidade}/${uf}` }
      setObject(updateObject)

    } catch (error) {
      setError('Ocorreu um erro ao buscar o CEP.Tente mais tarde')
    }
  }

  //Functions Entity Vehicle
  const searchClient = (event) =>   {
    const listClient = objects.filter((item) => {
      return item.name.toLowerCase().startsWith(event.query.toLowerCase());
    })
    setFilterClient(listClient);
  }

  const handleSelectedClient = (event) => {
    const object = { ...newVehicle };
    object.client.id = event.id;
    setVehicle(object);
    setSelectedClient(event);
  }

  const footerContentDialogVehicle = () => {
    return (
      <>
        <Button label="Salvar" severity="success" text raised onClick={dialogSaveVehicle} />
        <Button label="Cancelar" severity="danger" text  raised onClick={dialogCancelVehicle}/>
      </>
    )
  }

  const dialogCancelVehicle = () => {
    setVehicle(newVehicle);
    setSelectedClient(null)
    setDialogCreatedVehicle(false)
    setSubmitted(false)
  }

  const onInputChangeVehicle = (e , name) => {
    let tempValue = e.value;
    let _vehicle = {...vehicle};
    _vehicle[`${name}`] = tempValue.toUpperCase();
    setVehicle(_vehicle);

  }

  const dialogSaveVehicle = async () => {
    setSubmitted(true)
    if(vehicle.client.id && vehicle.carModelData && vehicle.licensePlate){
      let _object = {...vehicle}
      if(vehicle.id){
        try {
          await vehicleService.update(vehicle).then(() => {
            toast.current.show({severity:'success', summary: 'Sucesso', detail:'Alterado com sucesso!!', life: 3000});
            setObjects(null)
            setSelectedClient(null)
          })
        } catch (error) {
          setError("Erro ao editar. Tente novamente")
          toast.current.show({severity:'error', summary: 'Erro', detail:'Erro ao editar', life: 3000});
          setObject(null)
          setSelectedClient(null)
        }
        setSelectedClient(null)
        setDialogCreatedVehicle(false);
        setVehicle(newVehicle);

      } else {
        try {

          await vehicleService.insert(_object).then(() => {
            toast.current.show({severity:'success', summary: 'Sucesso', detail:'Adicionado com sucesso!!', life: 3000});
            setObjects(null)
            setSelectedClient(null)
          })
          
        } catch (error) {
          setError("Erro ao cadastrar. Tente novamente")
          toast.current.show({severity:'error', summary: 'Erro', detail:'Erro ao cadastrar', life: 3000});
          setObjects(null)
          setSelectedClient(null)
        }
        setSelectedClient(null)
        setDialogCreatedVehicle(false);
        setVehicle(newVehicle);
      }
    }
  }
  
  const handleToggleSidebar = () => {
    setVisible(!visible);
  }

  return (
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
          {newButton}{buttonVehicle}
        </C.ContainerButton>

        <div>
          <C.StyledDataTable 
            value={objects} 
            paginator rows={5} 
            rowsPerPageOptions={[5, 10, 25, 50]}
            emptyMessage="Não há cadastro">
            <Column field="name" header="Nome" style={{ width: '25%' }} body={nameBodyTemplate}></Column>
            <Column field="phone" header="Telefone" style={{ width: '20%' }} body={(rowData) => `${rowData.phone ?? ''}`} />
            <Column field='complementAddress' header="Endereço" body={(rowData) => `${rowData.address ?? ''} ${rowData.complementAddress?? ''} - ${rowData.cityState ?? ''}` } />
            <Column field='vehicle' header="Veículos" body={(rowData) => rowData.vehicles.map((vehicle) => vehicle.licensePlate).join(',') } />
            <Column  body={actionBodyTemplate} style={{ width: '12%' }}></Column>

          </C.StyledDataTable>
        </div>
      </C.Container>
      

      <Dialog header="Detalhes do Cliente" 
        modal className='p-fluid' 
        visible={dialogCreated} 
        style={{ width: '450px' }} 
        onHide={dialogCancel} 
        footer={footerContentDialog}
        >

        <C.StyledField className="field">
          <label htmlFor="name">Nome</label>
          <C.StyledInput value={object.name} id="name" onChange={(e) => onInputChange(e.target, 'name')} required autoFocus className={classNames({'p-invalid' : submitted && !object.name})}/>
          {submitted && !object.name && <small className='p-invalid' >*Campo obrigatório</small>}
        </C.StyledField>

        <C.StyledField className="field">
          <label htmlFor="email">Email</label>
          <C.StyledInput id="email" value={object.email ?? ''} onChange={(e) => onInputChange(e.target , 'email')} />
        </C.StyledField>

        <C.StyledField className="field">
          <label htmlFor="phone">Telefone</label>
          <S.StyledInputMask value={object.phone} mask="(99)99999-9999" id="phone" onChange={(e) => onInputChange(e.target, 'phone')} className={classNames({'p-invalid' : submitted && !object.phone})}/>
          {submitted && !object.phone && <small className='p-invalid'> *Campo obrigatório</small>}
        </C.StyledField>

        <C.StyledField className="field">
          <label htmlFor="zipCode">CEP</label>

          <S.StyledInputMask
            value={object.zipCode}
            onChange={(e) => requestApiViaCep(e)}
            id="zipCode"
            mask="99999-999"
            placeholder="99999-999"
            />
        </C.StyledField>

        <C.StyledField className="field">
          <label htmlFor="address">Rua</label>
          <C.StyledInput id="address" value={object.address ?? ''}/>
        </C.StyledField>

        <C.StyledField className="field">
          <label htmlFor="city">Cidade/Estado</label>
          <C.StyledInput id="city" value={`${object.cityState ? object.cityState : ''}`}/>
        </C.StyledField>

        <C.StyledField className="field">
          <label htmlFor="complementAddress">Numero/Complemento</label>
          <C.StyledInput value={object.complementAddress} id="complementAddress" onChange={(e) =>onInputChange(e.target, 'complementAddress')}/>
        </C.StyledField>

      </Dialog>

      <Dialog header="Detalhes do Veículo" 
        modal className='p-fluid' 
        visible={dialogCreatedVehicle} 
        style={{ width: '450px' }} 
        onHide={dialogCancelVehicle} 
        footer={footerContentDialogVehicle}
        >
  
        <C.StyledField className="field">         
          <label htmlFor="name">Cliente</label>
          <S.StyledAutoComplete
            field='name'
            value={selectedClient} 
            suggestions={filterClient ?? []} 
            completeMethod={searchClient}
            onChange={(e) => handleSelectedClient(e.value)}
            className={classNames({'p-invalid' : submitted && !vehicle.client.id})}/>
            {submitted && !vehicle.client.id && <small className='p-invalid'> *Campo obrigatório</small>}         
        </C.StyledField>

        <C.StyledField className="field">
          <label htmlFor="complementAddress">Placa</label>
          <C.StyledInput value={vehicle.licensePlate} id="licensePlate"
          onChange={(e) => onInputChangeVehicle(e.target , 'licensePlate')} className={classNames({'p-invalid' : submitted && !vehicle.licensePlate})}/>
          {submitted && !vehicle.licensePlate && <small className='p-invalid'> *Campo obrigatório</small>}
        </C.StyledField>

        <C.StyledField className="field">
          <label htmlFor="complementAddress">Ano de Fabricação</label>
          <C.StyledInput value={vehicle.carModelData} id="carModelData"
           onChange={(e) => onInputChangeVehicle(e.target , 'carModelData')} className={classNames({'p-invalid' : submitted && !vehicle.carModelData})} />
           {submitted && !vehicle.carModelData && <small className='p-invalid'> *Campo obrigatório</small>}
        </C.StyledField>

        <C.StyledField className="field">
          <label htmlFor="complementAddress">Cor</label>
          <C.StyledInput value={vehicle.color} id="color"
           onChange={(e) => onInputChangeVehicle(e.target , 'color')}/>
        </C.StyledField>
        

      </Dialog>
      
    </>
  )
}

export default Client;