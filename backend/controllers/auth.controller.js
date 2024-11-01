import bcryptjs from "bcryptjs";
import crypto from "crypto";
import { gerenateTokenAndSetCookie } from "../utils/gerenateTokenAndSetCookie.js";
import { User } from "../models/user.model.js";
import {
  sendPasswordResetEmail,
  sendResetSuccessEmail,
  sendVerificationEmail,
  sendWelcomeEmail,
} from "../mailtrap/emails.js";

export const signup = async (req, res) => {
  const { email, 
    // password, name 
  } = req.body;

  try {
    if (
      !email
      // || !password || !name
    ) {
      throw new Error("All fields are required");
    }

    const userAlreadyExists = await User.findOne({ email });
    if (userAlreadyExists) {
      return res
        .status(400)
        .json({ success: false, message: "User already exists." });
    }

    // const hashedPassword = await bcryptjs.hash(password, 10);
    const verificationToken = Math.floor(
      10000 + Math.random() * 900000
    ).toString();

    const user = new User({
      email,
      // password: hashedPassword,
      // name,
      verificationToken,
      verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000, // 24 hours
    });

    await user.save();

    // jwt
    gerenateTokenAndSetCookie(res, user._id);

    sendVerificationEmail(user.email, verificationToken);

    res.status(201).json({
      success: true,
      message: "User created successfully",
      user: {
        ...user._doc,
        // password: undefined,
      },
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const verifyEmail = async (req, res) => {
  const { code } = req.body;
  try {
    const user = await User.findOne({
      verificationToken: code,
      verificationTokenExpiresAt: { $gt: Date.now() },
    });

    if (!user || user.verificationTokenExpiresAt < Date.now()) {
      return res.status(400).json({
        success: false,
        message: "Verification token expired or invalid.",
      });
    }

    user.isVerified = true;
    user.verificationToken = undefined;
    user.verificationTokenExpiresAt = undefined;
    await user.save();

    await sendWelcomeEmail(
      user.email
      // user.name
    );

    res.status(200).json({
      success: true,
      message: "Email verified successfully",
      user: {
        ...user._doc,
        // password: undefined,
      },
    });
  } catch (error) {
    console.log("error in VerifyEmail", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const login = async (req, res) => {
  const {
    email
    // password
  } = req.body;
  try {
    const user = await User.findOne({
      email,
    });

    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid credentials" });
    }

    if (!user.isVerified) {
      return res.status(400).json({
        success: false,
        message: "Email is not verified.",
      });
    }

    //generate otp token
    const loginOtp = Math.floor(10000 + Math.random() * 900000).toString();
    user.loginOtp = loginOtp;
    user.loginOtpExpiresAt = Date.now() + 24 * 60 * 60 * 1000;
    await user.save();

    // if(!user) {
    //   return res.status(400).json({ success: false, message: "Invalid credentials"});
    // }
    // const isPasswordValid = await bcryptjs.compare(password, user.password);
    // if(!isPasswordValid) {
    //   return res.status(400).json({ success: false, message: "Invalid credentials"});
    // }

    // password: hashedPassword,
    // name,
    // 24 hours
    await sendVerificationEmail(user.email, user.loginOtp);

    gerenateTokenAndSetCookie(res, user._id);

    user.lastLogin = new Date();
    await user.save();

    res.status(200).json({
      success: true,
      message: "OTP sent to email.",
      user: {
        ...user._doc,
        // password: undefined,
      },
    });
  } catch (error) {
    console.log("Error in login", error);
    res.status(400).json({ succes: false, message: error.message });
  }
};

// Verify OTP and log in the user
export const verifyLoginOtp = async (req, res) => {
  const { otp } = req.body;
  const user = await User.findOne({
    loginOtp: otp,
    loginOtpExpiresAt: { $gt: Date.now() },
  });

  if (!user || user.loginOtp !== otp || user.loginOtpExpiresAt < Date.now()) {
    return res
      .status(400)
      .json({ success: false, message: "Invalid or expired OTP." });
  }

  // Clear the OTP fields after successful verification
  user.loginOtp = undefined;
  user.loginOtpExpiresAt = undefined;
  user.lastLogin = new Date();
  await user.save();

  res.status(200).json({ success: true, message: "Logged in successfully." });
};

export const logout = async (req, res) => {
  res.clearCookie("token");
  res.status(200).json({ success: true, message: "Logged out successfully" });
};

export const forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ succes: false, message: "User not found" });
    }

    // Generate reset token
    const resetToken = crypto.randomBytes(20).toString("hex");
    const resetTokenExpiresAt = Date.now() + 1 * 60 * 60 * 1000; // 1 hour

    user.resetPasswordToken = resetToken;
    user.resetPasswordExpiresAt = resetTokenExpiresAt;

    await user.save();

    // Send email
    await sendPasswordResetEmail(
      user.email,
      `${process.env.CLIENT_URL}/reset-password/${resetToken}`
    );

    res.status(200).json({
      succes: true,
      message: "Password reset link sent to your email",
    });
  } catch (error) {
    console.log("Error in forgotPassword ", error);
    res.status(400).json({ succes: false, message: error.message });
  }
};

export const resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { password } = req.body;

    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpiresAt: { $gt: Date.now() },
    });

    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid or expired reset token" });
    }

    // update password
    const hashedPassword = await bcryptjs.hash(password, 10);

    user.password = hashedPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpiresAt = undefined;
    await user.save();

    await sendResetSuccessEmail(user.email);

    res
      .status(200)
      .json({ success: true, message: "Password reset successful" });
  } catch (error) {
    console.log("Error in resetPassword ", error);
    res.status(400).json({ success: false, message: error.message });
  }
};

export const checkAuth = async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "User not found" });
    }

    res.status(200).json({
      success: true,
      user: {
        ...user._doc,
        // password: undefined
      },
    });
  } catch (error) {}
};
