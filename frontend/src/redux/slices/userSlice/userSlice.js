import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import authHelper from './authHelper'
// Get user from localStorage
const user = JSON.parse(localStorage.getItem('user'))


const initialState = {
  user: user ? user : null,
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: ''
}
// Register user
export const userRegister = createAsyncThunk('user/register', async (user, thunkAPI) => {
  try {
    return await authHelper.register(user)
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

// Otp verification

export const otp = createAsyncThunk('user/otp', async (otpCode, thunkAPI) => {
  try {
    const unRegUser = JSON.parse(localStorage.getItem('userData'))
    const { firstName, lastName , email, password, phone } = unRegUser
    const data = { firstName, lastName, email, password, phone, otpCode }
    localStorage.removeItem('userData')
    console.log(data);
    return await authHelper.otp(data)
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

// Login user
export const login = createAsyncThunk('user/login', async (user, thunkAPI) => {
  try {
    return await authHelper.login(user)
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

// Logout user
export const logout = createAsyncThunk('user/logout', () => {
  authHelper.logout()
})


export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false
      state.isError = false
      state.isSuccess = false
      state.message = ''
    }
  },
  extraReducers: (builder) => {
    builder.addCase(userRegister.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(userRegister.fulfilled, (state) => {
      state.isLoading = false
      state.isSuccess = true
    })
    builder.addCase(userRegister.rejected, (state, action) => {
      state.isLoading = false
      state.isError = true
      state.message = action.payload
      state.user = null
    })
    builder.addCase(otp.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(otp.fulfilled, (state, action) => {
      state.isLoading = false
      state.isSuccess = true
      state.user = action.payload
    })
    builder.addCase(otp.rejected, (state, action) => {
      state.isLoading = false
      state.isError = true
      state.message = action.payload
      state.user = null
    })
    builder.addCase(login.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(login.fulfilled, (state, action) => {
      state.isLoading = false
      state.isSuccess = true
      state.user = action.payload
    })
    builder.addCase(login.rejected, (state, action) => {
      state.isLoading = false
      state.isError = true
      state.message = action.payload
      state.user = null
    })
    builder.addCase(logout.fulfilled, (state) => {
      state.user = null
    })
  }
})


export const { reset } = userSlice.actions

export default userSlice.reducer