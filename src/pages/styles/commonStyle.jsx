import { styled } from "styled-components";
import { DataTable } from 'primereact/datatable';
import { InputText } from "primereact/inputtext";

export const Container = styled.div`
    font-family: Helvetica, Arial, sans-serif;  
`

export const ContainerButton = styled.div`
  margin: 10px;
  width: auto;
  border-radius: 10px;
  display: flex;
  justify-content: left;
  align-items: center;
  border: 1px solid rgba(68, 72, 109, 0.17);
  box-shadow: 0 3px 5px #00000005,0 0 2px #0000000d,0 1px 4px #00000014;
  height: 60px;
  margin-top: 30px;

  .p-button {
    height: 35px;
    margin-left: 10px;
  }
`


export const Header = styled.div`
  margin: 10px;
  display: flex;
  height: 60px;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  border-bottom: 1px solid rgba(68, 72, 109, 0.17);
  font-size: 20px;
  
  .p-inputtext {
    height: 35px;
    width: 180px
  }

  .show-btn-mobile{
    display: none;
  }

  .btn-mobile {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 30px;
    height: 40px;
    background-color: #4FAEE5 ;
    border: none;
  }

  .pi {
    font-size: 20px;
  }

  @media (max-width:810px) {
    .show-btn-mobile{
      display: block;
    }
  }

  @media (max-width:540px){
    span {
      display: none;
    }
  }
`
export const StyledDataTable = styled(DataTable)`
  padding: 10px;
  margin: 0px 10px;
  border-radius: 10px;
  box-shadow: 0 3px 5px #00000005,0 0 2px #0000000d,0 1px 4px #00000014;
`
export const StyledButtonsActions = styled.button`
  color: #f1f0f6;
  align-items: center;
  justify-content: center;
  height: 2.286rem;
  border: 1px solid transparent;
  border-radius: 10px;
  background-color: none;
  text-decoration: none;
  width: 40px;
  height: 40px;
  margin-left: 10px;
  cursor: pointer;
`
export const StyledField = styled.div`
  margin-bottom: 10px;

  small{
    color: red;
  }
`
export const StyledInput = styled(InputText)`
  height: 30px;
  box-shadow: 0 3px 5px #00000005,0 0 2px #0000000d,0 1px 4px #00000014;
`
