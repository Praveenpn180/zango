import { AppBar, Toolbar , Typography , Avatar ,Box , styled   } from '@mui/material'
import React , {useState} from 'react'
import { useDispatch , useSelector } from 'react-redux'

import { useNavigate } from 'react-router-dom'
export default function Navbar() {
  const UserBox = styled(Box)(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    gap: "10px",
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  }));
  const Icons = styled(Box)(({ theme }) => ({
    display: "none",
    alignItems: "center",
    gap: "20px",
    [theme.breakpoints.up("sm")]: {
      display: "flex",
    },
  }));
  const [open, setOpen] = useState(false);
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const {user}=useSelector((state)=>state.user)
  return (
    <AppBar>
      <Toolbar>
      <Typography variant="h6" sx={{ display: { xs: "none", sm: "block" } }} onClick={()=> navigate('/admin')}>
            Zango Admin
          </Typography>
         <Box>
         <Icons 
           onClick={(e) => setOpen(true)}>
            
            <Avatar
              sx={{ width: 30, height: 30 }}
              src="https://images.pexels.com/photos/846741/pexels-photo-846741.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
             
            />
             <Typography variant="span">{user.firstName}</Typography>
          </Icons>
          <UserBox onClick={(e) => setOpen(true)}>
            <Avatar
              sx={{ width: 30, height: 30 }}
              src="https://images.pexels.com/photos/846741/pexels-photo-846741.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
            />
            <Typography variant="span">{user.firstName}</Typography>
          </UserBox>
         </Box>
      </Toolbar>
    </AppBar>
  )
}
