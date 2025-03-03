import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { body, validationResult } from "express-validator";
import authMiddleware from "../middleware/authMiddleware.js";
import prisma from "../prismaClient.js";

const router = express.Router();

router.post(
  "/register",
  [
    body("email").isEmail().withMessage("Please provide a valid email."),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { username, email, password } = req.body;
    
    try {

      const checkUser = await prisma.user.findFirst({
        where: {
          OR: [
            {username},
            {email}
          ]
        }
      })
  
      if (checkUser) {
        return res
          .status(400)
          .json({ message: "Email or Username already in use" });
      }
  
      const hashedPassword = bcrypt.hashSync(password, 10);

      //add user
      const user = await prisma.user.create({
        data: {
          username,
          email,
          password: hashedPassword
        }
      })

      //add default note
      const title = "Hello";
      const content = "Save info easy and fast.";
      const currentDate = new Date(); 

      await prisma.note.create({
        data: {
          title,
          content,
          date: currentDate, 
          userId: user.id
        }
      })
      
      //create token
      const token = jwt.sign(
        { id: user.id, username },
        process.env.JWT_SECRET,
        { expiresIn: "6h" }
      );
      res.json({ token, user: { username } });
    } catch (error) {
      console.log(error.message);
      res
        .status(500)
        .json({ message: "Something went wrong. Please try again later." });
    }
  }
);

router.post(
  "/login",
  [
    body("username").notEmpty().withMessage("Username is required"),
    body("password").notEmpty().withMessage("Password is required"),
  ],
  async (req, res) => {
    const { username, password } = req.body;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const user = await prisma.user.findUnique({
        where: {
          username
        }
      })

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      const isPasswordValid = bcrypt.compareSync(password, user.password);
      if (!isPasswordValid) {
        return res
          .status(401)
          .json({ message: "Invalid username or password" });
      }

      const token = jwt.sign(
        { id: user.id, username: user.username },
        process.env.JWT_SECRET,
        { expiresIn: "6h" }
      );
      res.json({ token, user: { username } });
    } catch (error) {
      console.log(error.message);
      res
        .status(500)
        .json({ message: "Something went wrong. Please try again later." });
    }
  }
);

router.get("/me", authMiddleware, (req, res) => {
  const token = req.headers["authorization"];

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  const tokenWithoutBearer = token.replace("Bearer ", "");
  try {
    const decoded = jwt.verify(tokenWithoutBearer, process.env.JWT_SECRET);
    const { username } = decoded;

    res.json({ username });
  } catch (error) {
    console.log(error.message);
    res.status(401).json({ message: "Invalid token" });
  }
});

export default router;
