import { createAsyncThunk, createSlice, createAction } from "@reduxjs/toolkit";
import axios from "axios";



//action to redirect

const resetPostEdit = createAction("post/reset")
const resetPostDelete = createAction("post/delete")

//upload post

export const  uploadpostAction = createAsyncThunk(
    "post/upload",
    async (postdata, { rejectWithValue, getState}) => {
        
        //get user token
        const userData = getState()?.user;
        
       
        const { user } = userData;
        const config = {
            headers: {
                Authorization: `Bearer ${user?.token}`,
               
            },
        };
        try {
            //http call

         
            await axios.post(
                `http://localhost:4000/api/posts/upload`,
                postdata,
                config
            ).then((res)=>{
                console.log(res);
            })
            //dispatch action
           // dispatch(resetPost());
            
        } catch (error) {
            if (!error?.response) throw error;
            return rejectWithValue(error?.response?.data);
        }
    }
);

//fetch all posts
export const fetchPostsAction = createAsyncThunk(
    "post/fetch",

    async ( postdata,{ rejectWithValue, getState, dispatch }) => {
         //get user token
         const userData = getState()?.user;
       
       
         const { user } = userData;
         const config = {
             headers: {
                 Authorization: `Bearer ${user?.token}`,
                
             },
         };
        try {
            const {data} = await axios.get(
                `http://localhost:4000/api/posts/all`,
             config
            )
        
                return data;
            
           
        } catch (error) {
            console.log(error);
            if (!error?.response) throw error;
            return rejectWithValue(error?.response?.data);
        }
    }
);



//Update Post action
export const updatepostAction = createAsyncThunk(
    "post/updated",
    async (post, { rejectWithValue, getState, dispatch }) => {
        console.log(post);
        //get user token
        const user = getState()?.users;
        const { userAuth } = user;
        const config = {
            headers: {
                Authorization: `Bearer ${userAuth?.token}`,
            },
        };
        try {
            //http call
            const { data } = await axios.put(
                `http://localhost:4000/api/posts/${post?.id}`,
                post,
                config
            );
            //dispatch
            dispatch(resetPostEdit())
            return data;
        } catch (error) {
            if (!error?.response) throw error;
            return rejectWithValue(error?.response?.data);
        }
    }
);

//Delete Post action
export const deletepostAction = createAsyncThunk(
    "post/deleted",
    async (postId, { rejectWithValue, getState, dispatch }) => {
        //get user token
        const user = getState()?.users;
        const { userAuth } = user;
        const config = {
            headers: {
                Authorization: `Bearer ${userAuth?.token}`,
            },
        };
        try {
            //http call
            const { data } = await axios.delete(
                `http://localhost:4000/api/posts/${postId}`,
                config
            );
            //dispatch
            dispatch(resetPostDelete())
            return data;
        } catch (error) {
            if (!error?.response) throw error;
            return rejectWithValue(error?.response?.data);
        }
    }
);



//fetch post details
export const fetchPostDetailsAction = createAsyncThunk(
    "post/detail",

    async (id, { rejectWithValue, getState, dispatch }) => {
        try {
            const { data } = await axios.get(
                `http://localhost:4000/api/posts/${id}`,
            );
            console.log(data);
            return data;
        } catch (error) {
            console.log(error);
            if (!error?.response) throw error;
            return rejectWithValue(error?.response?.data);
        }
    }
);





//slice

const postSlice = createSlice({
    name: "post",
    initialState: {},
    extraReducers: builder => {
       

        //update post
        builder.addCase(updatepostAction.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(resetPostEdit, (state, action) => {
            state.isUpdated = true;
        })
        builder.addCase(updatepostAction.fulfilled, (state, action) => {
            state.postUpdated = action?.payload;
            state.loading = false;
            state.appErr = undefined;
            state.serverErr = undefined;
            state.isUpdated = false;
        });
        builder.addCase(updatepostAction.rejected, (state, action) => {
            state.loading = false;
            state.appErr = action?.payload?.message;
            state.serverErr = action?.error?.message;
        });

        //delete post
        builder.addCase(deletepostAction.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(resetPostDelete, (state, action) => {
            state.isDeleted = true;
        })
        builder.addCase(deletepostAction.fulfilled, (state, action) => {
            state.postUpdated = action?.payload;
            state.loading = false;
            state.appErr = undefined;
            state.serverErr = undefined;
            state.isDeleted = false;
        });
        builder.addCase(deletepostAction.rejected, (state, action) => {
            state.loading = false;
            state.appErr = action?.payload?.message;
            state.serverErr = action?.error?.message;
        });

        //fetch post
        builder.addCase(fetchPostsAction.pending, (state, action) => {
            state.loading = true;
        });

        builder.addCase(fetchPostsAction.fulfilled, (state, action) => {
            state.postLists = action?.payload;
            state.loading = false;
            state.appErr = undefined;
            state.serverErr = undefined;
        });
        builder.addCase(fetchPostsAction.rejected, (state, action) => {
            state.loading = false;
            state.appErr = action?.payload?.message;
            state.serverErr = action?.error?.message;
        });

        //fetch post details
        builder.addCase(fetchPostDetailsAction.pending, (state, action) => {
            state.loading = true;
        });

        builder.addCase(fetchPostDetailsAction.fulfilled, (state, action) => {
            state.postDetails = action?.payload;
            state.loading = false;
            state.appErr = undefined;
            state.serverErr = undefined;
        });
        builder.addCase(fetchPostDetailsAction.rejected, (state, action) => {
            state.loading = false;
            state.appErr = action?.payload?.message;
            state.serverErr = action?.error?.message;
        });


      
    },
});

export default postSlice.reducer;