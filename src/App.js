import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/home/Home'
import  Login  from './pages/auth/Login'
import Register from './pages/auth/Register'
import './style.scss'
import Chat from './pages/chat/Chat'
export default function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route exact path='/' element={<Home/>} />
       <Route path='/login' element={<Login/>}/>
       <Route path='/signup' element={<Register/>}/>
       <Route path='/chat' element={<Chat/>}/>
    </Routes>
    </BrowserRouter>
  )
}

