const express = require("express");
const bcryptjs = require("bcryptjs");
const User = require("../models/user_model");
const jwt = require("jsonwebtoken");
const auth=require('../middlewares/auth')

const authRouter = express.Router();

authRouter.post("/api/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ msg: "User with same email exists!" });
    }

    const hashedPassword = await bcryptjs.hash(password, 8);
    let user = new User({
      email,
      name,
      password: hashedPassword,
    });
    user = await user.save();
    res.json(user);
  } catch (e) {
    res.status(500).json({ err: e.message });
  }
});

//signin
authRouter.post("/api/signin", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: "User not exists" });

    var isMatch = await bcryptjs.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Incorrect pass!!" });

    const token = jwt.sign({ id: user._id }, "PasswordKey");

    res.json({ token, ...user._doc });
  } catch (e) {
    res.status(400).json({ err: e.message });
  }
});

authRouter.post("/tokenIsValid", async (req, res) => {
  try {
    const token = req.header("x-auth-token");
    if (!token) return res.json(false);

    const isVerified = jwt.verify(token, "PasswordKey");
    if (!isVerified) return res.json(false);

    const user = await User.findById(isVerified.id);
    if (!user) return res.json(true);

    res.json(true);
  } catch (e) {
    res.status(400).json({ err: e.message });
  }
});

authRouter.get("/", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user);
  
    res.json({ ...user._doc, token: req.token });
  } catch (e) {
    res.status(400).json({ err: e.message });
  }
});

module.exports = authRouter;
