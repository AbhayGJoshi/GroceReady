import dotenv from "dotenv";
import { Request, Response, Router } from "express";
import jwt from "jsonwebtoken";
import dbPA from "../config/dbConfig.js";

const SECRET_KEY = process.env.SECRET_KEY as jwt.PrivateKey;
const groceryRoute = Router();
dotenv.config();

//login user [mobile]
groceryRoute.post("/login", async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    if (email && password) {
      const user = await dbPA
        .select("*")
        .from("users")
        .where({ email: email.toLowerCase() });
      if (user[0]) {
        return res.status(200).json({ message: "User exist!" });
      }

      // if (user[0]) {
      //   const isValid = await bycrypt.compare(password, user[0].password);
      //   if (isValid) {
      //     const token = jwt.sign(
      //       {
      //         email: user[0].email,
      //         isAdmin: user[0].isAdmin,
      //       },
      //       SECRET_KEY,
      //       { expiresIn: "30d" },
      //     );
      //     return res.status(200).json({
      //       email: user[0].email,
      //       name: user[0].name,
      //       token: token,
      //     });
      //   } else {
      //     return res.status(200).json({ message: "Invalid Password." });
      //   }
      // } else {
      //   return res.status(200).json({ message: "User does not exist." });
      // }
    } else {
      return res.status(400).json({ message: "Bad request." });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Somthing went wrong." });
  }
});
