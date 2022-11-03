const asyncHandler = require('express-async-handler')
const User = require('../models/User')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const { doSms, verifyOtp } = require('../helpers/twilioHelper')

const signup = asyncHandler(async (req, res) => {
    const { firstName, lastName, email, phone, password } = req.body
    try {
        if (!firstName || !lastName || !email || !phone || !password) {
            return res.status(400).json({ message: "Please add all fields" });
        }

        const userExists = await User.findOne({ email })
        // Check if user exists

        if (userExists) {
            return res.status(400).json({ message: "User already exists" });


        }
        // Send OTP

        const otpSend = await doSms(phone)

        if (otpSend) {
            return res.status(200).json(true)
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
})



const otpVerification = asyncHandler(async (req, res) => {
    try {
        const { firstName, lastName, email, password, phone, otpCode } = req.body

        const optVerify = await verifyOtp(phone, otpCode)

        if (optVerify) {
            // Hash password
            const salt = await bcrypt.genSalt(10)
            const hashedPassword = await bcrypt.hash(password, salt)

            // Create User
            const user = await User.create({
                firstName, lastName, email, phone,
                password: hashedPassword
            })

            if (user) {
                return res.status(201).json({
                    _id: user.id,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email,
                    phone: user.phone,
                    token: generateTocken(user._id)
                })
            }
        } else {
            return res.status(400).json({ message: 'Invalid OTP' })

        }
    } catch (error) {
      return  res.status(500).json({ message: error.message });
    }


})

const login = asyncHandler(async (req, res) => {

    try {
        const { email, password } = req.body

        // Check for user email
        const user = await User.findOne({ email })

        // Check for user status
        if (user.isBlocked) {
           return res.status(400).json({ message: 'Account Blocked' })
        }

        if (user && (await bcrypt.compare(password, user.password)) && !user.isBlocked) {
            return (res.status(200).json({
                _id: user._id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                phone: user.phone,
                token: generateTocken(user._id)
            }))
        } else {
            return res.status(400).json({ message: 'Invalid credentials' })
        }


    } catch (error) {
      return  res.status(500).json({ message: error.message });
    }
}
)

const getUserDetails = asyncHandler(async (req, res) => {
    const { firstName, lastName, email, phone } = await User.findById(req.user.id)

   return res.status(200).json({
        firstName, lastName, email, phone
    })
})

//Generate Tocken
const generateTocken = (id) => {
    return jwt.sign({ id }, process.env.JWT, {
        expiresIn: '10d'
    })
}

module.exports = {
    generateTocken,
    getUserDetails,
    login,
    otpVerification,
    signup
}