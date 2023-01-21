const otpGenerator = require("otp-generator")

exports.generateOTP = () => {
    const otp = otpGenerator.generate(6, {
        upperCaseAlphabets: true,
        specialChars:false,
        digits:true,
        lowerCaseAlphabets:true
    })
    return otp
}