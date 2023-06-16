import { styled } from "styled-components";

export const ContainerInfoData = styled.div`
  display: flex;
  flex-wrap: wrap;;
  gap: 10px;
  margin: 30px 10px;
`

export const CardInfoData = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 15px;
  width: 250px;
  height: 80px;
  border-radius: 10px;
  background-color: #69B7FF;
  margin: auto;
  color: #ffffff;

  @media (max-width: 800px){
    width: 350px;
    height: 100px;
  }
`
export const StyledH6 = styled.h6`
  font-size: 15px;
  font-weight: bold;

  @media (max-width:800px) {
    font-size: 20px;
  }
`
export const StyledH1 = styled.h1`
  font-size: 40px;
  font-weight: bold;

  @media (max-width:800px) {
    margin-top: 15px;
  }
`
export const StyledSpan = styled.span`
  font-size: 25px;
  color: #ffffff;
  font-weight: bold;
`
export const StyledGraphics = styled.div` 
  display: flex;
  flex-wrap: wrap;
  margin: auto;
  margin-right: 20px;
`
export const ContainerChart = styled.div`
  margin: auto;
  display: flex;
  width: 500px;
  padding: 20px;

  @media (max-width:810px){
    width: 400px;
  }
`

