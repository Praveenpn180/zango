import { Avatar } from "@mui/material";
import {useRef} from 'react'
import { commentPost } from "../../../Api/PostApi";
import {useSelector} from 'react-redux'
function   Comments({ postId }) {
const write = {display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "20px",
    margin: "20px 0px"}

    const textInput = {
        flex:5,
        padding: "10px",
        border: "1px solid" ,
        backgroundColor: "transparent"
        
      }
      const sendButton = {
        border: "none",
        backgroundColor: "#5271ff",
        color: "white",
        padding: "10px",
        cursor: "pointer",
        borderRadius: "3px"
      }
      const comments = {
        margin: "30px 0px",
        display: "flex",
        justifyContent: "space-between",
        gap: "20px",
  }
const spans = {
    flex:"5",
    display: "flex",
    flexDirection: "column",
    gap: "3px",
    alignItems: "flex-start"

}
const commentDate= {
    flex:"1",
    alignSelf: "center" , 
    color: "gray",
    fontSize: "12px"
  }
  const { user } = useSelector((state) => state.user)
  const newComment = useRef()
const submitComment = (comment) =>{
    const dataa = new FormData();
    dataa.append("comment",comment.current.value)
    dataa.append("userId",user._id)
    dataa.append("postId",postId)
    try{
        console.log(comment.current.value);
        console.log(user._id);
        console.log(postId); 
       
        commentPost(dataa)

      }catch(err){
        console.log(err);
      }
      
     
}

    return (
        <div className="comments">
            <div style={write}>
                <img alt="" />
                <Avatar alt="Zango" >

          </Avatar>
                <input style={textInput}
                    ref={newComment}
                    type="text"
                    placeholder="write a comment" />
                <button style={sendButton} onClick={()=>{submitComment(newComment)}}>Send</button>
            </div>

            <div style={comments}>
                <img alt="" />
                <Avatar alt="Zango" >

          </Avatar>
                <div style={spans}>
                    <span style={{ fontWeight: "500"}}>Praveen</span>
                    <p>comment</p>
                </div>
                <span style={commentDate}>
                    12/06/1995
                </span>
            </div>

        </div>
    );
}

export default Comments;