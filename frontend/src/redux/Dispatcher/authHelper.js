import axios from 'axios'

const API_URL_REGISTER = 'http://localhost:4000/api/auth/signup'
const API_URL_LOGIN = 'http://localhost:4000/api/auth/login'
const API_URL_OTP = 'http://localhost:4000/api/auth/otp'

// Register user
const register = async (userData) => {
    const response = await axios.post(API_URL_REGISTER, userData)

    if (response.data) {
        localStorage.setItem('userData', JSON.stringify(userData))
    }

    return response.data
}

// Otp Verification
const otp = async (data) => {

    console.log(data);
    const response = await axios.post(API_URL_OTP, data)
    console.log(response);
    if (response.data) {
        localStorage.setItem('user', JSON.stringify(response.data))
    }
    return response.data
}

// Login user
const login = async (userData) => {
    const response = await axios.post(API_URL_LOGIN, userData)

    if (response.data) {
        localStorage.setItem('user', JSON.stringify(response.data))
    }

    return response.data
}

// Logout user
const logout = () => {
    localStorage.removeItem('user')
}

const authHelper = {
    register,
    logout,
    login,
    otp
}

export default authHelper