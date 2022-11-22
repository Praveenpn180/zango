import {
  AccountBox,
 
  Home,
 
} from "@mui/icons-material";
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,

} from "@mui/material";
import React from "react";
export default function Sidebar() {
  return (
    <Box flex={1} p={2} sx={{ display: { xs: "none", sm: "block" } }}>
    <Box position="fixed" marginTop={8}>
      <List>
        <ListItem disablePadding>
          <ListItemButton component="a" href="/admin">
            <ListItemIcon>
              <Home />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItemButton>
        </ListItem>
      
      
        
       
       
        <ListItem disablePadding>
          <ListItemButton component="a" href="/profile">
            <ListItemIcon>
              <AccountBox />
            </ListItemIcon>
            <ListItemText primary="Users" />
          </ListItemButton>
        </ListItem>
        
      </List>
    </Box>
  </Box>
  )
}
