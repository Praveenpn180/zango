import axios from 'axios'

const user = localStorage.getItem('user')

const API = axios.create({ baseURL: 'http://localhost:4000' });

API.interceptors.request.use((req) => {
    if (user) {
      req.headers.Authorization = `Bearer ${user?.token}`;
    }
  
    return req;
  });


export const likePost=(postId, userId)=>API.put(`/api/posts/like/${postId}/${userId}`)
export const commentPost=(data)=>{
  // for (const [key, value] of data.entries()) { 
  //   console.log(key, value);
  //  }
  API.post(`/api/posts/comment`,data)
}
export const getComments=(postId)=>API.get(`/api/posts/getcomment/${postId}`)