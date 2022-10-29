import { AddAPhoto, More ,Camera } from '@mui/icons-material'
import React from 'react'
import Input from './Input'
import Messages from './Messages'

export default function ChatHeader() {
  return (
    <div className="chatMessages">
        <div className="chatInfo">
            <span>Praveen</span>
            <div className="ChatIcons">
               <Camera />
                <AddAPhoto/>
                <More/>
            </div>
        </div>
        <Messages/>
        <Input/>
    </div>
  )
}
