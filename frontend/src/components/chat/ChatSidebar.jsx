import React from 'react'
import ChatSearch from './ChatSearch'
import ChatList from './ChatList'
export default function ChatSidebar() {
  return (
    <div className='chatSidebar'>
        <ChatSearch/>
        <ChatList />
        <ChatList />
        <ChatList />
        <ChatList />
        <ChatList />
        </div>
  )
}
