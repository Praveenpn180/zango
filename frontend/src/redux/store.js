import { configureStore } from '@reduxjs/toolkit'
import userReducer from './slices/userSlice/userSlice'
import postReducer from './slices/postSlice/postSlice'
export const store = configureStore({
  reducer: {
    user: userReducer,
    post:postReducer,
  },
})