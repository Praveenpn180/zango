import {
  Avatar,
  Button,
  ButtonGroup,
  Fab,
  Modal,
  Stack,
  styled,
  TextField,
  Tooltip,
  Typography,

} from "@mui/material";

import { useSelector , useDispatch } from 'react-redux'
import {  uploadpostAction , fetchPostsAction} from "../../redux/slices/postSlice/postSlice"
import React, { useState, useRef } from "react";
import {useForm} from 'react-hook-form'
import {
  Add as AddIcon,
  DateRange,
  EmojiEmotions,
  Image,
  PersonAdd,
  VideoCameraBack,
} from "@mui/icons-material";
import { Box } from "@mui/system";

const SytledModal = styled(Modal)({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

const UserBox = styled(Box)({
  display: "flex",
  alignItems: "center",
  gap: "10px",
  marginBottom: "20px",
});
export default function Add() {


  const preview = {
    flex: 1,
    display: "flex",
    justifyContent: "flex-end",
    position:"fixed",
    marginLeft:"300px",
    marginTop:"-70px"
    
  }
  const imag =  {
    width: "100px",
    height: "100px",
    objectFit: "cover",
    borderRadius:" 0px"
  }
  

  const [file, setFile] = useState(null);
  const { register, handleSubmit } = useForm()
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user)
 
  const descr = useRef();


  

  const onSubmit = (data) => {
    console.log(data);
    const postdata = new FormData();
    
    if(data.image[0]){
     
      const filename =data.image[0].name;
      postdata.append("name" , filename)
      postdata.append("image" ,data.image[0])
    }
      postdata.append("userId", user._id)
      postdata.append("description", data.description)
     
   
    try{
      dispatch(uploadpostAction(postdata))
      setTimeout(() => {
        dispatch(fetchPostsAction())
      }, 2000);
     
    }catch(err){
      console.log(err);
    }
    
   

  
    
  //dispatch(createpostAction(newPost));
  setOpen(false)
  }
  

  return (
    <>

       <form  onSubmit={handleSubmit(onSubmit)}>

      <Tooltip
        onClick={(e) => setOpen(true)}
        title="New Post"
        sx={{
          position: "fixed",
          bottom: 20,
          left: { xs: "calc(50% - 25px)", md: 30 },
        }}
      >
        <Fab color="primary" aria-label="add">
          <AddIcon />
        </Fab>
      </Tooltip>
      <SytledModal
        open={open}
        onClose={(e) => setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >

        <Box
          width={400}
          height={280}
          bgcolor={"background.default"}
          color={"text.primary"}
          p={3}
          borderRadius={5}
        >
          <Typography variant="h6" color="gray" textAlign="center">
            Create post
          </Typography>
          <UserBox>
            <Avatar
              src="https://images.pexels.com/photos/846741/pexels-photo-846741.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              sx={{ width: 30, height: 30 }}
            />
            <Typography fontWeight={500} variant="span">
              John Doe
            </Typography>
          </UserBox>
          <TextField
            sx={{ width: "100%" }}
            id="standard-multiline-static fff"
            multiline
            rows={3}
            placeholder="What's on your mind?"
            variant="standard" ref={descr}  
            name='description'
            {...register("description")}
          />
          <div style={preview}>
          {file && (
              <img style={imag} alt="" src={URL.createObjectURL(file)} />
            )}
          </div>
           
          <Stack direction="row" gap={1} mt={2} mb={3}>
            <EmojiEmotions color="primary" />
            <Image color="secondary" onClick={() => { document.getElementById('file').click() }} />
            <VideoCameraBack color="success" />
            <PersonAdd color="error" />
          </Stack>

          <ButtonGroup
            fullWidth
            variant="contained"
            aria-label="outlined primary button group"
          >
            <Button onClick={()=>{document.getElementById("postsubmit").click()}}>Post</Button>
            <Button sx={{ width: "100px" }}>
              <DateRange />
            </Button>
          </ButtonGroup>
        </Box>

      </SytledModal>

        <input
        onChange={(e) => setFile(e.target.files[0])}
          style={{ display: "none" }}
          type="file"
          id="file"
          accept=".png,.jpeg,.jpg"
        
          {...register("image")}  />
        
        <button id="postsubmit" type="submit"style={{ display: "none" }}>

        </button>
      </form>

    </>
  )
}
