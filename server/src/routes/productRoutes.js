const express = require("express");
const router = express.Router();

const {
  getProduct,
  getProductCategory,
  createProduct,
  updateProduct,
  deleteProduct
} = require("../controllers/productController");

const {
  generateAuthTokens,
  isAuthenticated,
  verifyToken,
  verifyRole
} = require("../middleware/auth");

router.get("/get", getProduct);
router.post(
  "/get-product-category",
  verifyToken,
  verifyRole(["admin"]),
  getProductCategory
);
router.post("/post", verifyToken, verifyRole(["admin"]), createProduct);
router.put("/put", verifyToken, verifyRole(["admin"]), updateProduct);
router.delete("/delete/:id", verifyToken, verifyRole(["admin"]), deleteProduct);

module.exports = router;