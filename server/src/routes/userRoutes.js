const express = require("express");
const router = express.Router();

const {
  getUsers,
  createUser,
  updateUser,
  deleteUser
} = require("../controllers/userController");

const { verifyToken, verifyRole } = require("../middleware/auth");

router.get("/get", verifyToken, verifyRole(["admin"]), getUsers);
router.post("/post", verifyToken, verifyRole(["admin"]), createUser);
router.put("/put", verifyToken, verifyRole(["admin"]), updateUser);
router.delete("/delete/:id", verifyToken, verifyRole(["admin"]), deleteUser);

module.exports = router;
