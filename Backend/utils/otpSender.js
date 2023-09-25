const twilio = require("twilio");
const accountSid = process.env.OTPSID;
const authToken = process.env.OTPAUTH_THOKEN;

// Create a Twilio client
const client = new twilio.Twilio(accountSid, authToken);

// Function to generate a random OTP
function generateOTP() {
  const length = 6;
  const charset = "0123456789";
  let otp = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    otp += charset[randomIndex];
  }
  return otp;
}

// Function to send OTP to a phone number
const sendOTP = async (phoneNumber) => {
  try {
    const otp = generateOTP();
    const message = await client.messages.create({
      body: `Your OTP is: ${otp}`,
      from: "+8801782572426", // Your Twilio phone number
      to: phoneNumber, // The recipient's phone number
    });

    console.log(`OTP sent to ${phoneNumber}: ${otp}`);
    return otp;
  } catch (error) {
    console.error("Error sending OTP:", error);
    throw error;
  }
};

module.exports = sendOTP;
