import { Favorite, FavoriteBorder, MoreVert, Share, Comment } from "@mui/icons-material";
import DateFormatter from '../../utils/DateFormater'
import Comments from "./Comments/Comments";
import { useState } from "react";
import {
 
  Avatar,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Checkbox,
  IconButton,
  Typography,
} from "@mui/material";

import {  useSelector} from "react-redux";
import { getComments, likePost } from "../../Api/PostApi"


export default function Post({ post }) {
  const [commentOpen, setCommentOpen] = useState(false);
const { user } = useSelector((state) => state.user)
const [liked, setLiked] = useState(post.likes.includes(user._id))
const [likes, setLikes] = useState(post.likes.length)
const [comment, setComment] = useState()


const handleLike = () => {
 likePost(post?._id,user._id)
  setLiked((prev) => !prev);
  liked? setLikes((prev)=>prev-1): setLikes((prev)=>prev+1)
};
const handleComment = async() => {

if(!commentOpen){
  const comments = await getComments(post?._id)
  
  setComment(comments.data)

}

  setCommentOpen(!commentOpen)

}

  return (
    <Card sx={{ margin: 5 }}>
      <CardHeader
        avatar={
          <Avatar alt="Zango" >

          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVert />
          </IconButton>
        }
        title={post?.userId?.firstName + " " + post?.userId?.lastName }
        subheader={<time><DateFormatter date={post?.createdAt} /></time>}
      />

      
      <CardMedia
        component="img"
        height="20%"
        image={post.image}
        alt=""
        onError={i => i.target.style.display='none'}
      />
      
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {post?.description}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites" onClick={handleLike}  title="New Post">
        
       
          <Checkbox 
          {...liked ? (
          {checked:true }) : ({checked:false} )}
            icon={<FavoriteBorder />}
            checkedIcon={<Favorite sx={{ color: "red" }} />}
          /> 
          <span style={{fontSize: 12}}> {likes} likes</span>
         
        </IconButton>
        <IconButton aria-label="comment" onClick={ handleComment }>
          <Comment />
        </IconButton>
       
        <IconButton aria-label="share">
          <Share />
        </IconButton>
      </CardActions>
      {commentOpen && <Comments post={comment} />}
    </Card>
  )
}
