import React from 'react'
import { Routes, Route } from 'react-router-dom'
import AdminLogin from '../pages/admin/AdminLogin'
import AdminDashboard from '../pages/adminDashboard/AdminDashboard'
export default function AdminRoute() {
  return (
     <>
     <Routes>
     <Route exact path='/adminlogin' element={<AdminLogin/>} />
     <Route exact path='/admin' element={<AdminDashboard/>} />
     
    </Routes>
   </>
  )
}
