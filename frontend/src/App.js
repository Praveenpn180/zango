import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import './style.scss'
import UserRoute from './routes/UserRoute'
import AdminRoute from './routes/AdminRoute' 
import {ToastContainer} from 'react-toastify'
export default function App() {
  return (
    <BrowserRouter>
    <AdminRoute/>
    <UserRoute/>
    <ToastContainer/>
    </BrowserRouter>
  )
}

