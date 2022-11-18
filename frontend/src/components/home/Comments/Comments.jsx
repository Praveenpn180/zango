import { Avatar } from "@mui/material";
import {useRef} from 'react'
import { commentPost } from "../../../Api/PostApi";
import {useSelector} from 'react-redux'
import DateFormatter from '../../../utils/DateFormater'

function   Comments({ post }) {

    console.log(post);
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
   
    try{
       
        let commentData= {}
        commentData.comment = comment.current.value
        commentData.userId = user._id
       commentData.postId = post[0]?.postId
        commentPost(commentData)
        
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
            {post[0]._id? (post?.map((c,index)=>(
            <div style={comments} key={index}>
                <img alt="" />
                <Avatar alt="Zango" >

          </Avatar>
                <div style={spans}>
                    <span style={{ fontWeight: "500"}}>{c.userId?.firstName +" "+c.userId?.lastName}</span>
                    <p>{c.comment}</p>
                </div>
                <span style={commentDate}>
              
                <time><DateFormatter date={c?.createdAt} /></time>
                </span>
            </div>
                ))):(<div></div>)}
        </div>
    );
}

export default Comments;