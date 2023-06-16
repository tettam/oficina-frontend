import { useEffect, useState } from 'react';
import * as C from './styles/commonStyle';
import * as S from './styles/homeStyle'

import { InputText } from 'primereact/inputtext';
import 'primeicons/primeicons.css';

import LineChart from '../components/LineChart';
import PieChart from '../components/PieChart';
import BarChart from '../components/BarChart';


import { ClientService } from '../service/ClientService';
import { BudgetService } from '../service/BudgetService';
import { Button } from 'primereact/button';
import MenuMobile from '../components/MenuMobile';

const Home = () => {
  const name = 'Dashboard';
  const serviceClient = new ClientService();
  const serviceBudget = new BudgetService();
  const [error , seterror] = useState();
  //Request for Variables
  const [clients, setClients] = useState(null);
  const [budgets, setBudgets] = useState(null);
  const [budgetData , setBudgetData] = useState(null);
  const [visible , setVisible] = useState(false);

  const formatDateMonth = () => {
    const monthNames = ['jan','fev','mar','abr','mai','jun','jul','ago','set','out','nov','dez']
    const currentMonthNow = new Date().getMonth();
    const filterMonth = monthNames.filter((item, index) => index <= currentMonthNow);
    return filterMonth;
  }

  const formatData = () => {
    const count = {};
    const dateNow = new Date().getFullYear()
    const monthNames = ['jan','fev','mar','abr','mai','jun','jul','ago','set','out','nov','dez']

    const filterBudget = budgets.filter((item) => {
      const data = new Date(item.entryDate).getFullYear();
      return dateNow == data;
    })

    filterBudget.forEach(element => {
      const data = new Date(element.entryDate).getMonth();

      if(count[monthNames[data]]){
        count[monthNames[data]] += 1;
      } else {
        count[monthNames[data]] = 1;
      }
    })
    return count
  }

  useEffect(() => {
    if(budgets !== null) {
      const formattedLabels =  formatDateMonth();
      setBudgetData({
        labels: formattedLabels,
        datasets:[{
          label:'Orçamentos no Ano',
          data: formatData(),
          backgroundColor:['#9AD0F5'],
          borderColor:'black',
          borderWidth:1
        }]
      })
    }
  }, [budgets]);
 
  // const [userData , setUserData] = useState({
  //   labels: UserData.map((item) => item.year) ,
  //   datasets: [{
  //     label: 'Users Gained',
  //     data: UserData.map((item) => item.userGain),
  //     backgroundColor: ['#9AD0F5'],
  //     borderColor:'black',
  //     borderWidth:2
  //   }]
  // });

  useEffect(() => {
    fetchClient();
    fetchBudgets()
  }, [])

  const fetchClient = async () => {
    try {
      if(clients == null) {
        const response = await serviceClient.findAll();
        setClients(response.data)
      }
    } catch (error) {
      seterror("Falha na requisição de clientes");
    }
  }

  const fetchBudgets = async () => {
    try {
      if(budgets == null){
        const response = await serviceBudget.findAll();
        setBudgets(response.data)
      }
    } catch (error) {
      seterror("Falha na requisição de orçamentos")
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
          <InputText placeholder={`Pesquisa rápida`} className='input-search' />
        </span>    
        </C.Header>

        <S.ContainerInfoData >
        <S.CardInfoData style={{backgroundColor: '#3b5079'}}>
            <div>
              <S.StyledH6>Valor faturado</S.StyledH6>
              <S.StyledH1></S.StyledH1>
            </div> 
            <S.StyledSpan className="pi pi-dollar" ></S.StyledSpan>
          </S.CardInfoData>

          <S.CardInfoData style={{backgroundColor: '#3D4073'}}>
            <div>
              <S.StyledH6>Clientes cadastrados</S.StyledH6>
              <S.StyledH1>{clients && clients.length}</S.StyledH1>
            </div> 
            <S.StyledSpan className="pi pi-users" ></S.StyledSpan>
          </S.CardInfoData>

          <S.CardInfoData style={{backgroundColor: '#a4a44b'}}>
            <div>
              <S.StyledH6>Orçamentos feitos</S.StyledH6>
              <S.StyledH1>{budgets && budgets.length}</S.StyledH1>
            </div> 
            <S.StyledSpan className="pi pi-file-edit" ></S.StyledSpan>
          </S.CardInfoData>

          <S.CardInfoData style={{backgroundColor: '#3e6e9b'}}>
            <div>
              <S.StyledH6>Serviços concluídos</S.StyledH6>
              <S.StyledH1>{}</S.StyledH1>
            </div> 
            <S.StyledSpan className="pi pi-check" ></S.StyledSpan>
          </S.CardInfoData>
        </S.ContainerInfoData>

        <S.StyledGraphics>
          <S.ContainerChart>
          {budgetData && 
            <BarChart chartData={budgetData} />
          }
          </S.ContainerChart>
          <S.ContainerChart>
          {budgetData && 
            <LineChart chartData={budgetData} />
          }
          </S.ContainerChart>
        </S.StyledGraphics>

        
      </C.Container>
    </>
  )
}

export default Home;