const UserModal = require("../models/userModal");

// Get Users
const getUsers = async (req, res) => {
  try {
    const users = await UserModal.find();
    res.status(200).json({
      message: "Users fetched successfully",
      users: users
    });
  } catch (err) {
    res.status(400).send(err);
  }
};

// Create User
const createUser = async (req, res) => {
  try {
    const user = new UserModal(req.body);
    const savedUser = await user.save();
    res.status(201).json({
      message: "User saved successfully",
      savedUser: savedUser
    });
  } catch (err) {
    res.status(400).send(err);
  }
};

// Update User
const updateUser = async (req, res) => {
  try {
    const { _id, userName, userEmail, userPassword, userImage, userRole } =
      req.body;

    const updatedUser = await UserModal.findByIdAndUpdate(
      _id,
      {
        userName,
        userEmail,
        userPassword,
        userImage,
        userRole
      },
      { new: true }
    );

    if (updatedUser) {
      res.status(200).json({
        message: "User updated successfully",
        updatedUser: updatedUser
      });
    }
  } catch (err) {
    res.status(400).send(err);
  }
};

// Delete User
const deleteUser = async (req, res) => {
  try {
    const id = req.params.id;
    await UserModal.findByIdAndDelete(id);
    const updatedUsers = await UserModal.find();
    res.status(200).json({
      message: "Deleted successfully",
      updatedUsers: updatedUsers
    });
  } catch (error) {
    res.status(500).json({ message: "Error in server..." });
  }
};

module.exports = {
  getUsers,
  createUser,
  updateUser,
  deleteUser
};
