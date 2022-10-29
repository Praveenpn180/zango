import { Mail, Notifications, Pets } from "@mui/icons-material";
import { useDispatch,useSelector } from 'react-redux'
import { logout } from '../../redux/userSlice'
import { useNavigate } from 'react-router-dom'
import {
  AppBar,
  Avatar,
  Badge,
  Box,
  InputBase,
  Menu,
  MenuItem,
  styled,
  Toolbar,
  Typography,
} from "@mui/material";
import React, { useState } from "react";

const StyledToolbar = styled(Toolbar)({
  display: "flex",
  justifyContent: "space-between",
});

const Search = styled("div")(({ theme }) => ({
  backgroundColor: "white",
  padding: "0 10px",
  borderRadius: theme.shape.borderRadius,
  width: "40%",
}));

const Icons = styled(Box)(({ theme }) => ({
  display: "none",
  alignItems: "center",
  gap: "20px",
  [theme.breakpoints.up("sm")]: {
    display: "flex",
  },
}));

const UserBox = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: "10px",
  [theme.breakpoints.up("sm")]: {
    display: "none",
  },
}));
  export default function Navbar() {
    const [open, setOpen] = useState(false);
    const navigate=useNavigate()

    const {user}=useSelector((state)=>state.user)

    if(!user){
      navigate('/login')
    }
    const dispatch=useDispatch()
    return (
      <AppBar>
        <StyledToolbar>

          <Typography variant="h6" sx={{ display: { xs: "none", sm: "block" } }}>
            Zango
          </Typography>
          <Pets sx={{ display: { xs: "block", sm: "none" } }} />
          <Search>
            <InputBase placeholder="search..." />
          </Search>
          <Icons>
            <Badge badgeContent={4} color="error">
              <Mail />
            </Badge>
            <Badge badgeContent={2} color="error">
              <Notifications />
            </Badge>
            <Avatar
              sx={{ width: 30, height: 30 }}
              src="https://images.pexels.com/photos/846741/pexels-photo-846741.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              onClick={(e) => setOpen(true)}
            />
          </Icons>
          <UserBox onClick={(e) => setOpen(true)}>
            <Avatar
              sx={{ width: 30, height: 30 }}
              src="https://images.pexels.com/photos/846741/pexels-photo-846741.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
            />
            <Typography variant="span">John</Typography>
          </UserBox>
        </StyledToolbar>
        <Menu
          id="demo-positioned-menu"
          aria-labelledby="demo-positioned-button"
          open={open}
          onClose={(e) => setOpen(false)}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
        >
          <MenuItem>Profile</MenuItem>
          <MenuItem>My account</MenuItem>
          <MenuItem  onClick={()=>dispatch(logout())}>Logout</MenuItem>
        </Menu>
      </AppBar>
    );
  }
