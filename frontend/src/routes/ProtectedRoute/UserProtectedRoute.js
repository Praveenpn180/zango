
import { Outlet, Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

const UserProtectedRoute= ()=>{
    const {user}=useSelector((state)=>state.user)
    return(
        user? <Outlet/>: <Navigate to="/login"/>
    )
}   

export default UserProtectedRoute