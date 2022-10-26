import React from 'react'
import ChatHeader from '../../components/chat/ChatHeader'
import ChatSidebar from '../../components/chat/ChatSidebar'

export default function Chat() {
  return (
    <div className="chat">
        <div className="chatContainer">
            <ChatSidebar/>
            <ChatHeader/>
        </div>
    </div>
  )
}
