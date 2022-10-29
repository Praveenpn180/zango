require('dotenv').config()

const accountSid = process.env.TWILIO_ACCOUNT_SID
const authToken = process.env.TWILIO_AUTH_TOKEN
const client = require('twilio')(accountSid, authToken)

const servicesId = process.env.TWILIO_SERVICES_ID

 const doSms = (phone) => {
    let resp = {}
    return new Promise((resolve, reject) => {
        client.verify.services(servicesId).verifications.create({
            to: `+91${phone}`,
            channel: 'sms'
        }).then((resp) => {
            resp.valid = true
            resolve(resp)
        }).catch((err) => {
            reject(err)
        })
    })
}

 const verifyOtp = (phone, otp) => {
    return new Promise((resolve, reject) => {
        client.verify.services(servicesId).verificationChecks.create({
            to: `+91${phone}`,
            code: otp
        }).then((res) => {
            resolve(res)
        }).catch((err) => {
            reject(err)
        })
    })
}

module.exports = {
    verifyOtp, doSms
}