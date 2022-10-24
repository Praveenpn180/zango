import React from 'react'
import ChatMessages from '../../components/chat/ChatMessages'
import ChatSidebar from '../../components/chat/ChatSidebar'

export default function Chat() {
  return (
    <div className="chat">
        <div className="chatContainer">
            <ChatSidebar/>
            <ChatMessages/>
        </div>
    </div>
  )
}
