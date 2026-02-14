import User from "../models/User.js";
import Audit from "../models/Audit.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !password || !email) {
    return res.status(400).json({ message: "All Faields are mandatory" });
  }
  try {
    const existinguser = await User.findOne({ email });
    if (existinguser) {
      return res.status(401).json({ message: "User Exist" });
    }
    const hasheddpassword = await bcrypt.hash(password, 10);
    const user = new User({
      username,
      email,
      password: hasheddpassword,
    });
    await user.save();
    res.status(200).json({
      message: "User Created Successfully",
      user: { id: user._id },
      username: user.username,
      email: user.email,
      role: user.role,
    });

    await Audit.create({
      action: "Register",
      actBy: user._id,
      details: user.email,
    });
  } catch (error) {
    console.error("Error to register user ", error);
    return res.status(500).json({ message: "server error" });
  }
};

// Login
export const login = async (req, res) => {
  const { email, password } = req.body;

  if (!password || !email) {
    return res.status(400).json({ message: "Email and Password are required" });
  }
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Incorrect Credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Incorrect Credentials" });
    }

    const accessToken = jwt.sign(
      {
        id: user._id,
        role: user.role,
      },
      process.env.ACCESS_TOKEN_SECRETE,
      { expiresIn: "15m" },
    );

    const refreshToken = jwt.sign(
      {
        id: user._id,
        role: user.role,
      },
      process.env.REFRESH_TOKEN_SECRETE,
      { expiresIn: "7d" },
    );

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    user.refreshToken = refreshToken;
    await user.save();

    res.status(200).json({
      message: "Logedin",
      accessToken,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
    });

    await Audit.create({
      action: "Login",
      actBy: user._id,
      details: user.email,
    });
  } catch (error) {
    console.error("Error to Login ", error);
    return res.status(500).json({ message: "server error" });
  }
};

export const refreshToken = async (req, res) => {
  const oldToken = req.cookies.refreshToken;
  if (!oldToken) {
    return res.status(401).json({ message: "No Refresh Toke Provided" });
  }
  try {
    const decoded = jwt.verify(oldToken, process.env.REFRESH_TOKEN_SECRETE);
    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const accessToken = jwt.sign(
      {
        id: user._id,
        role: user.role,
      },
      process.env.ACCESS_TOKEN_SECRETE,
      { expiresIn: "15m" },
    );

    const newrefreshToken = jwt.sign(
      {
        id: user._id,
        role: user.role,
      },
      process.env.REFRESH_TOKEN_SECRETE,
      { expiresIn: "7d" },
    );

    user.refreshToken = newrefreshToken;
    await user.save();

    res.cookie("refreshToken", newrefreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      message: "Access Refreshed",
      accessToken,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
    });

    await Audit.create({
      action: "RefreshToken",
      actBy: user._id,
      details: user.email,
    });
  } catch (error) {
    console.error("Error to refresh token", error);
    return res.status(500).json({ message: "server error" });
  }
};

export const logout = async (req, res) => {
  try {
    const refreshToken = req.cookies?.refreshToken;
    const user = await User.findOne({ refreshToken });
    if (user) {
      user.refreshToken = null;
      await user.save();
    }

    await Audit.create({
      action: "Logedout",
      actBy: user._id,
      details: user.email,
    });

    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    res.status(200).json({
      message: "User logedout Successfully",
    });
  } catch (error) {
    console.error("Error to Logout User", error);
    return res.status(404).json({ message: "server error" });
  }
};
