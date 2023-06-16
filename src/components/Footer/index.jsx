import * as C from './style'
import 'primeicons/primeicons.css';
        

const Footer = () => {

  return (
    <>
      <C.Container>
        <p>Desenvolvido por  <strong>Marco Tettamanti</strong></p>
        <a href="https://github.com/tettam" target="_blank" rel="noopener noreferrer">
          <C.Icon className="pi pi-github" alt="GitHub"></C.Icon>
        </a>
      </C.Container>
      
    </>
  )

}

export default Footer;
        