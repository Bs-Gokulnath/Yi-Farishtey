const express = require('express');
const router = express.Router();
const User = require('../models/Users');
const nodemailer = require('nodemailer');   

let otpStore = {}; // Temporary storage for OTPs

// ✅ Signup (No OTP)
router.post('/signup', async (req, res) => {
  try {
    const { email, chapter } = req.body;

    if (!email || !chapter) {
      return res.status(400).json({ message: 'Email and chapter are required' });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already registered' });
    }

    const user = new User({ email, chapter });
    await user.save();

    res.json({ message: 'Signup successful' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error during signup' });
  }
});

// ✅ Signin (Generate and Send OTP)
router.post('/signin', async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) return res.status(400).json({ message: 'Email is required' });

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'Email not found' });

    // Generate OTP
    const otp = Math.floor(100 + Math.random() * 900).toString();
    otpStore[email] = otp;

    // Send OTP via email
    const emailUser = process.env.EMAIL || 'your-email@gmail.com';
    const emailPass = process.env.EMAIL_PASS || 'your-app-password';
    
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: emailUser,
        pass: emailPass,
      },
    });

    await transporter.sendMail({
      from: emailUser,
      to: email,
      subject: 'Your OTP Code',
      text: `Your OTP code is ${otp}. It is valid for 3 minutes.`,
    });

    res.json({ message: 'OTP sent successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error sending OTP' });
  }
});

// ✅ Verify OTP
router.post('/verify-otp', (req, res) => {
  const { email, otp } = req.body;

  if (otpStore[email] && otpStore[email] === otp) {
    delete otpStore[email]; // Remove OTP after verification
    return res.json({ message: 'OTP verified successfully' });
  } else {
    return res.status(400).json({ message: 'Invalid OTP' });
  }
});

module.exports = router;
