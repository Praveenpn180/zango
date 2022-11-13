import { Box, Stack, Skeleton } from "@mui/material";
import React, { useEffect } from "react";
import Post from "./Post";
//  import { Posts } from "../../dummyData";
import { useSelector, useDispatch } from 'react-redux'
import { fetchPostsAction } from "../../redux/slices/postSlice/postSlice"




export default function Feed() {
  
  const dispatch = useDispatch()
  const post = useSelector(state => state?.post)
  const { postLists,loading  } = post;

  useEffect(() => {

    dispatch(fetchPostsAction())

  }, [dispatch])


  return (
    <Box flex={4} p={{ xs: 0, md: 2 }}>
      {loading ? (
        <Stack spacing={1}>
          <Skeleton variant="text" height={100} />
          <Skeleton variant="text" height={20} />
          <Skeleton variant="text" height={20} />
          <Skeleton variant="rectangular" height={300} />
        </Stack>
      ) : (
        postLists?.map((p) => (
          <Post key={p._id} post={p} />
        ))
      )
      }
    </Box>
  )
}
