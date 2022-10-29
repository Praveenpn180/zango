const express = require('express')
const router = require('express').Router()

const { signup, login, otpVerification } = require("../controllers/auth.js")

router.post("/signup", signup)
router.post("/login", login)
router.post("/otp", otpVerification)

module.exports = router;