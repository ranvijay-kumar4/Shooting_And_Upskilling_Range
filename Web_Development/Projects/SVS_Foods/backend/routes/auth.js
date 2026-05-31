import express from 'express';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import nodemailer from 'nodemailer';
import User from '../models/User.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// Helper to generate access token
const generateAccessToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_ACCESS_SECRET, {
    expiresIn: '15m' // access token expires in 15 minutes
  });
};

// Helper to generate refresh token
const generateRefreshToken = (userId, rememberMe) => {
  const expiresIn = rememberMe ? '7d' : '1h';
  return jwt.sign({ id: userId }, process.env.JWT_REFRESH_SECRET, {
    expiresIn
  });
};

// Helper to set HTTP-only cookies
const setCookies = (res, accessToken, refreshToken, rememberMe) => {
  // Access token cookie (short-lived)
  res.cookie('accessToken', accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 15 * 60 * 1000 // 15 minutes
  });

  // Refresh token cookie (long-lived depending on rememberMe)
  const refreshMaxAge = rememberMe 
    ? 7 * 24 * 60 * 60 * 1000 // 7 days
    : 1 * 60 * 60 * 1000;      // 1 hour

  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: refreshMaxAge
  });
};

// @desc    Register user
// @route   POST /api/auth/register
// @access  Public
router.post('/register', async (req, res, next) => {
  try {
    const { name, email, password, role } = req.body;

    // Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists with this email' });
    }

    // Determine role (default is user, admin is restricted or created explicitly)
    // In production we would restrict admin creation, but we allow specifying for simple MVP dev
    const userRole = role || 'user';

    const user = await User.create({
      name,
      email,
      password,
      role: userRole
    });

    // Generate tokens
    const accessToken = generateAccessToken(user._id);
    const refreshToken = generateRefreshToken(user._id, false);

    // Save refresh token to user
    user.refreshToken = refreshToken;
    await user.save();

    // Set HTTP-only cookies
    setCookies(res, accessToken, refreshToken, false);

    res.status(201).json({
      success: true,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    next(error);
  }
});

// @desc    Login user & set cookies
// @route   POST /api/auth/login
// @access  Public
router.post('/login', async (req, res, next) => {
  try {
    const { email, password, rememberMe } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Please provide email and password' });
    }

    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Check password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate tokens
    const isRemember = !!rememberMe;
    const accessToken = generateAccessToken(user._id);
    const refreshToken = generateRefreshToken(user._id, isRemember);

    // Save refresh token to database
    user.refreshToken = refreshToken;
    await user.save();

    // Set HTTP-only cookies
    setCookies(res, accessToken, refreshToken, isRemember);

    res.json({
      success: true,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    next(error);
  }
});

// @desc    Refresh access token using HTTP-only refresh token cookie
// @route   POST /api/auth/refresh
// @access  Public
router.post('/refresh', async (req, res, next) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
      return res.status(401).json({ message: 'Refresh token not found' });
    }

    // Verify token
    let decoded;
    try {
      decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
    } catch (err) {
      return res.status(401).json({ message: 'Invalid or expired refresh token' });
    }

    // Find user and match token
    const user = await User.findById(decoded.id);
    if (!user || user.refreshToken !== refreshToken) {
      return res.status(401).json({ message: 'Refresh token was revoked or invalid' });
    }

    // Re-verify the expiration context
    const tokenExp = decoded.exp * 1000;
    const isRemember = (tokenExp - Date.now()) > 2 * 60 * 60 * 1000; // if remaining time is more than 2h, it was rememberMe (7d)

    // Generate new tokens
    const newAccessToken = generateAccessToken(user._id);
    const newRefreshToken = generateRefreshToken(user._id, isRemember);

    // Save new refresh token in DB
    user.refreshToken = newRefreshToken;
    await user.save();

    // Update HTTP-only cookies
    setCookies(res, newAccessToken, newRefreshToken, isRemember);

    res.json({
      success: true,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    next(error);
  }
});

// @desc    Logout user & clear cookies
// @route   POST /api/auth/logout
// @access  Public
router.post('/logout', async (req, res, next) => {
  try {
    const refreshToken = req.cookies.refreshToken;

    if (refreshToken) {
      // Find user and remove token from DB
      const user = await User.findOne({ refreshToken });
      if (user) {
        user.refreshToken = null;
        await user.save();
      }
    }

    // Clear cookies
    res.clearCookie('accessToken', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict'
    });
    res.clearCookie('refreshToken', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict'
    });

    res.json({ success: true, message: 'Logged out successfully' });
  } catch (error) {
    next(error);
  }
});

// @desc    Get active user session details
// @route   GET /api/auth/me
// @access  Private
router.get('/me', protect, async (req, res, next) => {
  try {
    res.json({
      success: true,
      user: {
        id: req.user._id,
        name: req.user.name,
        email: req.user.email,
        role: req.user.role
      }
    });
  } catch (error) {
    next(error);
  }
});

// @desc    Forgot Password - Sends Reset Email
// @route   POST /api/auth/forgot-password
// @access  Public
router.post('/forgot-password', async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: 'No user registered with that email' });
    }

    // Create reset token
    const resetToken = crypto.randomBytes(32).toString('hex');

    // Hash token and set to database fields
    user.resetPasswordToken = crypto
      .createHash('sha256')
      .update(resetToken)
      .digest('hex');

    user.resetPasswordExpires = Date.now() + 60 * 60 * 1000; // 1 hour expiration
    await user.save();

    // Create reset url
    const resetUrl = `${process.env.CLIENT_URL || 'http://localhost:5173'}/reset-password/${resetToken}`;

    // Mail config using Gmail SMTP provided
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    const mailOptions = {
      from: `"SVS Food Company" <${process.env.EMAIL_USER}>`,
      to: user.email,
      subject: 'Password Reset Request - SVS Foods',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px;">
          <h2 style="color: #d97706; text-align: center;">SVS Food Company</h2>
          <hr style="border: 0; border-top: 1px solid #eee;">
          <p>Hello ${user.name},</p>
          <p>You are receiving this email because you (or someone else) requested a password reset for your account on SVS Foods.</p>
          <p>Please click the button below to complete the process. This link is valid for 1 hour.</p>
          <div style="text-align: center; margin: 30px 0;">
            <a href="${resetUrl}" style="background-color: #d97706; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; font-weight: bold; display: inline-block;">Reset Password</a>
          </div>
          <p>If you did not request this, please ignore this email and your password will remain unchanged.</p>
          <hr style="border: 0; border-top: 1px solid #eee;">
          <p style="font-size: 12px; color: #888; text-align: center;">SVS Food Company &copy; 2026. All rights reserved.</p>
        </div>
      `
    };

    await transporter.sendMail(mailOptions);

    res.json({ success: true, message: 'Password reset link sent to your email' });
  } catch (error) {
    // Reset DB fields if email fails
    console.error('Password reset email error:', error);
    try {
      const { email } = req.body;
      const user = await User.findOne({ email });
      if (user) {
        user.resetPasswordToken = null;
        user.resetPasswordExpires = null;
        await user.save();
      }
    } catch (e) {}

    res.status(500).json({ message: 'Email could not be sent' });
  }
});

// @desc    Reset Password
// @route   POST /api/auth/reset-password/:token
// @access  Public
router.post('/reset-password/:token', async (req, res, next) => {
  try {
    const { password } = req.body;

    // Get hashed token
    const resetPasswordToken = crypto
      .createHash('sha256')
      .update(req.params.token)
      .digest('hex');

    const user = await User.findOne({
      resetPasswordToken,
      resetPasswordExpires: { $gt: Date.now() }
    });

    if (!user) {
      return res.status(400).json({ message: 'Invalid or expired password reset token' });
    }

    // Set new password
    user.password = password;
    user.resetPasswordToken = null;
    user.resetPasswordExpires = null;
    user.refreshToken = null; // Clear refresh token, forcing relogin on next access
    await user.save();

    res.json({ success: true, message: 'Password reset successful. You can now log in.' });
  } catch (error) {
    next(error);
  }
});

export default router;
