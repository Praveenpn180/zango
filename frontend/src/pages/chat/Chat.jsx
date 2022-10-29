import React from 'react'
import ChatHeader from '../../components/chat/ChatHeader'
import ChatSidebar from '../../components/chat/ChatSidebar'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
export default function Chat() {
  const navigate=useNavigate()
  const {user}=useSelector((state)=>state.user)

  if(!user){
    navigate('/login')
  }
  return (
    <div className="chat">
        <div className="chatContainer">
            <ChatSidebar/>
            <ChatHeader/>
        </div>
    </div>
  )
}
