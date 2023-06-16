import { styled } from "styled-components";
import { InputText } from 'primereact/inputtext';

export const Container = styled.div`
  font-family: Helvetica, Arial, sans-serif;
  display: flex;
  align-items: center;
  height: 80px;
  justify-content: space-between;
  border-bottom: 1px solid #DFE7EF;
  margin-right: 10px;
`

export const StyledH4 = styled.h4`
  margin-left: 50px;
`

export const StyledInputText = styled(InputText)`
  margin-right: 50px;
  height: 30px;
  width: 200px;
  background-color: transparent;
  border: none;
`