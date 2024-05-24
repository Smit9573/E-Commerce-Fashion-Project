function generateOTP() {
    return Math.floor(100000 + Math.random() * 900000); // Generates a random 6-digit OTP
}
function generateOTPWithExpiration() {
    const otp = generateOTP();
    const expirationTime = Date.now() + 5 * 60 * 1000; // OTP expires in 5 minutes
    return { otp, expirationTime };
}
// Function to verify OTP
function verifyOTP(otpData, enteredOTP) {
    const { otp, expirationTime } = otpData;
    if (Date.now() > expirationTime) {
        // OTP has expired
        return false;
    }
    return otp === enteredOTP;
}
module.exports = {
    generateOTP,
    generateOTPWithExpiration,
    verifyOTP
}