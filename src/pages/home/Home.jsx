import { Box, createTheme, Stack, ThemeProvider} from '@mui/material'
import React from 'react'
import Navbar from '../../components/home/Navbar'
import Leftbar from '../../components/home/Leftbar'
import Feed from '../../components/home/Feed'
import Rightbar from '../../components/home/Rightbar'
import Add from "../../components/home/Add";
import { useState } from "react";

export default function Home() {
  const [mode, setMode] = useState("light");

  const darkTheme = createTheme({
    palette: {
      mode: mode,
    },
  });
  return (
    <ThemeProvider theme={darkTheme}>
      <Box bgcolor={"background.default"} color={"text.primary"}>
        <Navbar />
        <Stack direction="row" spacing={2} justifyContent="space-between">
        <Leftbar setMode={setMode} mode={mode}/>
          <Feed />
          <Rightbar />
        </Stack>
        <Add />
      </Box>
    </ThemeProvider>
  )
}
