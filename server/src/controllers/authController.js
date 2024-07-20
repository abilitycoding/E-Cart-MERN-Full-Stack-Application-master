const UserModal = require("../models/userModal");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET;

// Sign Up
const signUp = async (req, res) => {
  try {
    const { userName, userPassword, userEmail } = req.body;

    // Check if the user already exists
    const existingUser = await UserModal.findOne({ userEmail });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash the userPassword before saving
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(userPassword, salt);

    const newUser = new UserModal({
      userName,
      userEmail,
      userPassword: hashedPassword
    });

    const savedUser = await newUser.save();
    res.status(201).json({
      message: "User registered successfully",
      savedUser
    });
  } catch (err) {
    res.status(400).send(err);
  }
};

// Sign In
const signIn = async (req, res) => {
  try {
    const { userEmail, userPassword } = req.body;
    console.log(req.body);

    // Check if the user exists
    const user = await UserModal.findOne({ userEmail });
    if (!user) {
      return res
        .status(400)
        .json({ message: "Invalid userEmail or userPassword" });
    }

    console.log(user);

    // Validate userPassword
    const validPassword = await bcrypt.compare(userPassword, user.userPassword);

    console.log(validPassword);

    if (!validPassword) {
      return res
        .status(400)
        .json({ message: "Invalid userEmail or userPassword" });
    }

    const token = jwt.sign({ _id: user._id, role: user.userRole }, JWT_SECRET, {
      expiresIn: "24h",
    });

    res.status(200).json({
      message: "Logged in successfully",
      token
    });
  } catch (err) {
    res.status(400).send(err);
  }
};

module.exports = {
  signUp,
  signIn
};
