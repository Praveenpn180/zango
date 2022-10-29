import React from 'react'
import { Routes, Route } from 'react-router-dom'
import AdminLogin from '../pages/admin/AdminLogin'
export default function AdminRoute() {
  return (
     <>
     <Routes>
     <Route exact path='/admin' element={<AdminLogin/>} />
    </Routes>
   </>
  )
}
