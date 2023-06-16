import { useRoutes } from "react-router-dom";
import NotFound from "../pages/NotFound";
import Home from "../pages/Home";
import Client from "../pages/Client";
import Product from "../pages/Product";
import Budget from '../pages/Budget'



const MainRouters = () => { 
  return useRoutes([
    {path:'/', element:<Home />},
    {path:'/clients', element:<Client />},
    {path:'/products', element:<Product />},
    {path:'/budgets', element:<Budget />},
    {path:'*', element:<NotFound />},
  ])
}

export default MainRouters;