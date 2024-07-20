const express = require("express");
require("dotenv").config();
const bodyParser = require("body-parser");
const passport = require("./src/config/passport-config");
const cors = require("cors");
const app = express();
app.use(bodyParser.json());
app.use(passport.initialize());

app.use(
  cors({
    origin: ["http://localhost:3000"],
    credentials: true
  })
);

/* MongoDb Integration */
const mongoose = require("./src/config/db");

app.get("/", (req, res) => {
  res.send("E-Cart Server!");
});

/* Controller */
const productRoutes = require("./src/routes/productRoutes");
const userRoutes = require("./src/routes/userRoutes");
const authRoutes = require("./src/routes/authRoutes");

app.use("/api/product", productRoutes);
app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`E-Cart Server listening on port ${PORT}!`);
});
