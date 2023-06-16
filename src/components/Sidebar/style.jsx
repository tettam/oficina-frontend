import { styled } from "styled-components";
import { PanelMenu } from 'primereact/panelmenu';
import { Link } from "react-router-dom";

export const Container = styled.div`
  width: 250px;
  display: flex;
  flex-direction: column;
  padding:  10px;
  background-color: aliceblue;
  border-radius: 10px;
  box-shadow: 0 3px 5px #00000005,0 0 2px #0000000d,0 1px 4px #00000014;
  margin: 10px 0px 0px 10px;
`
export const Logo = styled.img`
  margin: auto;
  width: 80px;
  margin-bottom: 20px;
`
export const StylePanelMenu = styled(PanelMenu)`
  * {
    font-size: 14px;
  }
  width: auto;
  max-height: 400px;
  overflow-y: scroll;
`

export const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;

`


