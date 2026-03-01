import User from "../models/UserModel.js";

export const getAvailableCounsellor = async () => {
  return await User.findOne({ role: "counselor" , isActive : true });
};