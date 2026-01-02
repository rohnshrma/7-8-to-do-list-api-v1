import bcrypt from "bcryptjs";
import User from "../models/user.js";

export const REGISTER_USER = async (req, res) => {
  try {
    const { email, name, password } = req.body;

    let existingUser = await User.findOne({ email });

    if (existingUser) {
      console.log("User exists");
      return res.status(400).json({
        status: "fail",
        message: "User already exists with same email",
      });
    }

    let user = new User({
      name,
      email,
      password: await bcrypt.hash(password, 10),
    });

    await user.save();
    console.log("user saved");

    res.status(201).json({
      status: "success",
      data: { user },
      message: `User Registered`,
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: err });
  }
};
export const LOGIN_USER = async (req, res) => {
  res.send("login");
};
