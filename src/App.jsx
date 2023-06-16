import Sidebar from "./components/Sidebar"
import MainRouters from "./routes/MainRouters"
import Footer from "./components/Footer"
import MenuBar from "./components/Menubar"
import './App.css';

function App() {
  return (
    
    <div className="main" >
      <div className="menu">
        <Sidebar />
      </div>
      <div className="content">
        <MenuBar />
        <MainRouters />
        <Footer />
      </div>
    </div>  
   
  )
}

export default App
