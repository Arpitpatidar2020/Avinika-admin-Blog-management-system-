const Admin = require('../models/Admin');
const OTP = require('../models/OTP');
const generateToken = require('../utils/generateToken');
const generateOTP = require('../utils/generateOTP');
const sendEmail = require('../utils/sendEmail');

// @desc    Auth admin & get token
// @route   POST /api/auth/login
// @access  Public
const login = async (req, res) => {
    const { email, password } = req.body;

    const admin = await Admin.findOne({ email });

    if (admin && (await admin.matchPassword(password))) {
        res.json({
            _id: admin._id,
            name: admin.name,
            email: admin.email,
            profileImage: admin.profileImage,
            token: generateToken(admin._id),
        });
    } else {
        res.status(401).json({ message: 'Invalid email or password' });
    }
};

// @desc    Forgot Password - Send OTP
// @route   POST /api/auth/forgot-password
// @access  Public
const forgotPassword = async (req, res) => {
    const { email } = req.body;
    console.log('ForgotPassword Request for:', email);
    
    try {
        const admin = await Admin.findOne({ email });
        if (!admin) {
            console.log('Admin not found for:', email);
            return res.status(404).json({ message: 'Admin not found with this email' });
        }

        const otpCode = generateOTP();
        console.log('Generated OTP:', otpCode);
        
        await OTP.findOneAndDelete({ email }); // Delete old OTP if exists
        console.log('Old OTP deleted (if any)');
        
        await OTP.create({ email, otp: otpCode });
        console.log('New OTP record created in DB');

        console.log('Attempting to send email to:', email);
        await sendEmail({
            email,
            subject: 'Your Avinika Admin Password Reset OTP',
            message: `Your OTP for password reset is: ${otpCode}. It is valid for 10 minutes.`,
        });
        console.log('Email sent successfully!');
        res.status(200).json({ message: 'OTP sent to your email' });
    } catch (error) {
        console.error('ForgotPassword System Error:', error);
        res.status(500).json({ message: 'Email could not be sent' });
    }
};

// @desc    Verify OTP
// @route   POST /api/auth/verify-otp
// @access  Public
const verifyOTP = async (req, res) => {
    const { email, otp } = req.body;
    const otpRecord = await OTP.findOne({ email, otp });

    if (!otpRecord) {
        return res.status(400).json({ message: 'Invalid or expired OTP' });
    }

    res.status(200).json({ message: 'OTP verified successfully' });
};

// @desc    Reset Password
// @route   POST /api/auth/reset-password
// @access  Public
const resetPassword = async (req, res) => {
    const { email, otp, newPassword } = req.body;
    const otpRecord = await OTP.findOne({ email, otp });

    if (!otpRecord) {
        return res.status(400).json({ message: 'Verification failed. Please try again.' });
    }

    const admin = await Admin.findOne({ email });
    if (!admin) {
        return res.status(404).json({ message: 'Admin not found' });
    }

    admin.password = newPassword;
    await admin.save();
    await OTP.deleteOne({ email });

    res.status(200).json({ message: 'Password reset successful. You can login now.' });
};

module.exports = { login, forgotPassword, verifyOTP, resetPassword };
