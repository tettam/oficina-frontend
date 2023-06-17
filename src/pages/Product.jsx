import { useEffect, useRef, useState } from 'react';
import { Buttons } from '../components/Buttons';
import * as C from './styles/commonStyle';
import * as S from './styles/productStyle';

import { Toast } from 'primereact/toast';
import { InputText } from 'primereact/inputtext';
import { Dialog } from 'primereact/dialog';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { ProductService } from '../service/ProductService';
import { classNames } from 'primereact/utils';
import MenuMobile from '../components/MenuMobile';

const Product = () => {
  let newObject = {
    name:'',
    price:''
  }

  const [objects , setObjects] = useState(null);
  const [object , setObject] = useState(newObject);
  const [dialogCreated , setDialogCreated] = useState(false);
  const [error , setError] = useState(null);
  const [submitted , setSubmitted] = useState(false);
  const [visible , setVisible] = useState(false);
  const serviceProduct = new ProductService()

  const handleClickNewObj = () => {
    setDialogCreated(true);
  }
  
  const buttons = new Buttons();
  const newButton = buttons.newObject("Novo Produto" , handleClickNewObj);
  const toast = useRef(null)
  const name = 'Produtos';


  useEffect(() => {
    fetchData();
  }, [objects])

  const fetchData = async () => {
    if(objects == null) {
      const response = await serviceProduct.findAll()
      setObjects(response.data);
    }
  }

  const deleteObject = async (obj) => {
    if(obj.id) {
      try {
        await serviceProduct.delete(obj.id).then(() => {
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
    setSubmitted(true);
    if(object.name.trim() && object.price){
      let _object = {...object}
      if(object.id){
        try {
          await serviceProduct.update(object).then(() => {
            toast.current.show({severity:'success', summary: 'Sucesso', detail:'Alterado com sucesso!!', life: 3000});
            resetDialog();
          })
        } catch (error) {
          setError("Erro ao editar. Tente novamente")
          toast.current.show({severity:'error', summary: 'Erro', detail:'Erro ao editar', life: 3000});
          resetDialog();
        }

      } else {
        try {
          console.log(_object)
          await serviceProduct.insert(_object).then(() => {
            toast.current.show({severity:'success', summary: 'Sucesso', detail:'Adicionado com sucesso!!', life: 3000});
            resetDialog();
          })
          
        } catch (error) {
          setError("Erro ao cadastrar. Tente novamente")
          toast.current.show({severity:'error', summary: 'Erro', detail:'Erro ao cadastrar', life: 3000});
          resetDialog();
        }
      }
    }
  }

  const resetDialog = () => {
    setObjects(null)
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
  }

  const editObject = (obj) => {
    let editObj = { ...obj  }
    setObject(editObj)
    setDialogCreated(true)
  }

  const actionBodyTemplate = (rowData) => {
    return (
      <>
        <C.StyledButtonsActions style={{ backgroundColor: '#4169e1', marginBottom: '10px'}} onClick={() => editObject(rowData)}>
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
    const tempValue = e.value
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
            <Column field="name" header="Nome"  body={(rowData) => `${rowData.name ?? ''}`}></Column>
            <Column field='price' header="Preço" body={(rowData) => `${formatPrice(rowData.price ? rowData.price : '')}`} />
            <Column  body={actionBodyTemplate} style={{ width: '12%' }}></Column>

          </C.StyledDataTable>
        </div>
      </C.Container>
      

      <Dialog header="Detalhes do Produto" 
        modal className='p-fluid' 
        visible={dialogCreated} 
        style={{ width: '450px' }} 
        onHide={dialogCancel} 
        footer={footerContentDialog}
        >

        <C.StyledField className="field">
          <label htmlFor="name">Nome</label>
          <C.StyledInput value={object.name}
            autoFocus
            type='text'
            id="name" 
            onChange={(e) => onInputChange(e.target, 'name')} className={classNames({'p-invalid' : submitted && !object.name})}/>
             {submitted && !object.name && <small className='p-invalid'> *Campo obrigatório</small>}
        </C.StyledField>

        <C.StyledField className="field">
          <label htmlFor="price">Preço de Compra</label>
          <S.StyledInputNumber inputId="currency-us"
            id='price' 
            value={object.price} 
            onChange={(e) => onInputChange(e, 'price')} 
            mode="currency" currency="BRL" locale="pt-BR" className={classNames({'p-invalid' : submitted && !object.price})} />
            {submitted && !object.price && <small className='p-invalid'> *Campo obrigatório</small>}
        </C.StyledField>
      </Dialog>
    </>
  )
}

export default Product;