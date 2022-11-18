import React, { useState } from 'react'
import { Box,  createTheme, Stack, ThemeProvider } from '@mui/material'
import ChatHeader from '../../components/chat/ChatHeader'
import ChatSidebar from '../../components/chat/ChatSidebar'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Navbar from '../../components/home/Navbar'
import Leftbar from '../../components/home/Leftbar'
import './chat.scss'
export default function Chat() {
  const [mode, setMode] = useState("light");
  const darkTheme = createTheme({
    palette: {
      mode: mode,
    },
  });
  const navigate = useNavigate()
  const { user } = useSelector((state) => state.user)
 
  if (!user) {
    navigate('/login')
  }
  return (
    <>
      
      <ThemeProvider theme={darkTheme}>
      <Box bgcolor={"background.default"} color={"text.primary"}>
        <Navbar />
        <Stack direction="row" spacing={2} justifyContent="space-between">
        <Leftbar setMode={setMode} mode={mode}/>
        <Box className="chat" width={790}
          height={550}
          bgcolor={"background.default"}
          color={"text.primary"}
          p={3}
          borderRadius={5}>
          <Box className="chatContainer">
            <ChatSidebar />
            <ChatHeader />
          </Box>
        </Box>
        </Stack>
       
      </Box>
    </ThemeProvider>
        

    

    </>
  )
}
