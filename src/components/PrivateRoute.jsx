import { Navigate, Outlet } from "react-router-dom"
//Outlet allow us to render child routes or child elements
import { useAuthStatus } from "../hooks/useAuthStatus"
import Spinner from "./Spinner"

const PrivateRoute = () => {
    const {loggedIn, checkingStatus} = useAuthStatus() //coming from retun of useAuthStatus.js
  
    if(checkingStatus){
        return <Spinner/>
    }
  //checkingStatus ho rha ho to if chaly gi, na ho rhi ho to nichy route hojaye ga page
    return loggedIn ? <Outlet /> : <Navigate to='/sign-in/'/> // allow us to return child elements
}

export default PrivateRoute