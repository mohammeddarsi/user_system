import Audit from "../models/Audit.js";
import User from "../models/User.js";

export const getUsers = async (req, res) => {
  try {
    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);
    const skip = (page - 1) * limit;
    const total = await User.countDocuments();
    const users = await User.find().skip(skip).limit(limit).select("-password");

    res.status(200).json({
      users,
      total,
      totalPage: Math.ceil(total / limit),
      currentPage: page,
    });
  } catch (error) {
    console.error("Error to Fetchhing User", error);
    return res.status(404).json({ message: "server error" });
  }
};

export const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "user not exist" });
    }

    res
      .status(200)
      .json({ message: "user profile fetched successfully", user });
  } catch (error) {
    console.error("Error to Fetchhing User profile", error);
    return res.status(500).json({ message: "server error" });
  }
};

export const getLogs = async (req, res) => {
  try {
    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);
    const skip = (page - 1) * limit;
    const total = await Audit.countDocuments();
    const audit = await Audit.find()
      .populate("actBy", "username")
      .skip(skip)
      .limit(limit);

    res.status(200).json({
      audit,
      total,
      totalPage: Math.ceil(total / limit),
      currentPage: page,
    });
  } catch (error) {
    console.error("Error to Fetchhing Logs", error);
    return res.status(404).json({ message: "server error" });
  }
};
