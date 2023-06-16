import { Sidebar } from 'primereact/sidebar';
import { useNavigate } from 'react-router-dom';
import * as C from '../Sidebar/style'
import * as S from './style'

const MenuMobile = ({visible , onHide}) => {
  const navigate = useNavigate();

  const model = [
    {
      label:'Home',
      icon:'pi pi-home',
      items:[
        {
          label:'Dashboard',
          icon:'pi pi-fw',
          to:'/'
        },
        {
          label:'Informações da Empresa',
          icon:'pi pi-fw',
          to:'/company-data'
        },
      ]
    },
    {
      label:'Comercial',
      icon:'pi pi-users',
      items:[
        {
          label:'Clientes',
          icon:'pi pi-fw',
          to:'/clients'
        },
        // {
        //   label:'Fornecedores',
        //   icon:'pi pi-fw',
        //   to:'/suppliers'
        // },
        {
          label:'Produtos',
          icon:'pi pi-fw',
          to:'/products'
        },
        {
          label:'Orçamentos',
          icon:'pi pi-fw',
          to:'/budgets'
        }
      ]
    },
    {
      label:'Financeiro',
      icon:'pi pi-dollar',
      items:[
        {
          label:'Notas Fiscais',
          icon:'pi pi-fw',
          to:'/invoices',
        }
      ]
    },
    {
      label:'Estoque',
      icon:'pi pi-box',
      items:[
        {
          label:'Controle de Estoque',
          icon:'pi pi-fw',
          to:'/inventory-control'
        },
        {
          label:'Entrada e Saída de Produtos',
          icon:'pi pi-fw',
          to:'/entry-exit-products'
        }
      ]
    }
  ]

  const findByUrl = (url) => {
    let foundItem = null

    model.forEach((item) => {
      item.items.forEach((obj) => {
        if(obj.label.toLowerCase() === url) {
          foundItem = obj;
        }
      })
    })

    return foundItem
  }

  const handleClickElement = (event) => {
    const elementClick = event.target.textContent.toLowerCase();
    const elementUrl = findByUrl(elementClick)
    if(elementUrl) {
     navigate(elementUrl.to)
    }
  }


  return (
    <div className="card flex justify-content-center menu-mobile">
    <S.StyledSidebarMobile visible={visible} onHide={onHide}>
      <C.StylePanelMenu model={model} className="w-full md:w-25rem my-class" onClick={(e) => handleClickElement(e)} />
    </S.StyledSidebarMobile>
</div>
  )
}

export default MenuMobile;
        