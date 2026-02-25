import { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import jwt, { Secret } from "jsonwebtoken";
import { TypeJWTPayload } from "./TypeJWTPayload";
dotenv.config();

const SECRET_KEY = process.env.SECRET_KEY as Secret;

export const authAdmin = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  const authData = req.headers.authorization;
  try {
    if (authData) {
      const token = authData.split(" ")[1];
      const validUser = jwt.verify(token, SECRET_KEY) as TypeJWTPayload;

      if (validUser && validUser.isAdmin) {
        next();
      } else {
        res.status(401).json({ message: "unauthorized request" });
        return;
      }
    } else {
      res.status(401).json({ message: "unauthorized request" });
      return;
    }
  } catch (error) {
    res.status(401).json({ message: "unauthorized request" });
    return;
  }
};
