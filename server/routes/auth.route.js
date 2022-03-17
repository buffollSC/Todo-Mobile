const { Router } = require("express");
const router = Router();
const User = require("../models/User");
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
router.post("/registration",
  [
    check("email", "Incorrect email").isEmail(),
    check("password", "Incorrect пароль").isLength({ min: 6 }),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: "Incorrect data during registration",
        });
      }
      const { email, password } = req.body;
      const isUser = await User.findOne({ email });

      if (isUser) {
        return res.status(409).json({ message: "This Email is already in use." });
      }
      const hashPassword = await bcrypt.hash(password, 12);
      const user = new User({
        email,
        password: hashPassword,
      });
      await user.save();
      res.status(201).json({ message: "User created." });
    } catch (error) {
      console.log(error);
    }
  }
);
router.post("/login",
  [
    check("email", "Incorrect email").isEmail(),
    check("password", "Incorrect пароль").exists(),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      
      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: "Incorrect data during authorization",
        });
      }
      const { email, password } = req.body;
      const user = await User.findOne({ email });

      if (!user) {
        return res.status(400).json({
          message: "This email is not in the database!",
        });
      }

      bcrypt.compare(password, user.password, (err, data) => {
        if (err) {
          throw err;
        }
        if (data) {
          const jwtSecret = "wfeqwwqqerjhbqlFaiSFii13913934h3c3038FKm";
          const token = jwt.sign({ userId: user.id }, jwtSecret, {
            expiresIn: "1h",
          });
          res.json({
            token,
            userId: user.id,
          });
        } else {
            return res.status(400).json({
            message: "Passwords do not match!",
            });
        }
      });
    } catch (error) {
      console.log(error);
    }
  }
);
module.exports = router;
