import bcrypt from "bcrypt";
import dotenv from "dotenv";
import { Request, Response, Router } from "express";
import jwt from "jsonwebtoken";
import dbPA from "../config/dbConfig";
dotenv.config();

const groceryRoute = Router();

const SECRET_KEY = process.env.SECRET_KEY as jwt.PrivateKey;
// const groceryRoute = Router();

//login user [mobile]
groceryRoute.post("/login", async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Bad request." });
    }

    const user = await dbPA
      .select("*")
      .from("users")
      .where({ email: email.toLowerCase() });

    if (!user[0]) {
      return res.status(404).json({ message: "User does not exist." });
    }

    const isValid = await bcrypt.compare(password, user[0].password);

    if (!isValid) {
      return res.status(401).json({ message: "Invalid password." });
    }

    const token = jwt.sign(
      {
        email: user[0].email,
        isAdmin: user[0].isAdmin,
      },
      SECRET_KEY,
      { expiresIn: "30d" },
    );

    return res.status(200).json({
      email: user[0].email,
      name: user[0].name,
      token,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong." });
  }
});

groceryRoute.get("/", async (req, res) => {
  const products = await dbPA("items").select("*").orderBy("createdAt", "desc");
  res.json(products);
});

// //register product - mobile app
groceryRoute.post("/", async (req, res) => {
  try {
    const newItems = await dbPA("items").insert({
      ...req.body,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });
    // console.log("Incoming body:", req.body);
    if (newItems.length > 0) {
      return res.status(201).json({
        message: "New Times created.",
      });
    } else return res.status(400).json({ message: "Unable to create Times." });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Somthing went wrong." });
  }
});

export default groceryRoute;
