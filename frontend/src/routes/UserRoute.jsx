import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from '../pages/home/Home'
import Login from '../pages/auth/Login'
import Signup from '../pages/auth/Signup'
import Chat from '../pages/chat/Chat'
import Otp from '../pages/auth/OtpVerification'


export default function UserRoute() {
    return (
        <>
            <Routes>
                <Route exact path='/' element={<Home />} />
                <Route path='/login' element={<Login />} />
                <Route path='/otp' element={<Otp />} />
                <Route path='/signup' element={<Signup />} />
                <Route path='/chat' element={<Chat />} />
            </Routes>
        </>
    )
}
