import jwt, { type JwtPayload } from "jsonwebtoken";
import { eq } from "drizzle-orm";
import type {Request,Response, NextFunction } from "express";
import { verifyToken } from "../utilits/token/verifyToken.js";
import { db } from "../db/DBconnection.js";
import { users } from "../db/schema.js";



declare module "express-serve-static-core" {
  interface Request {
    user?: string | JwtPayload;
  }
}

export const authentication = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const authorization = req.headers.authorization;
    if (!authorization) {
      return res.status(401).json({ message: "Authorization header is required" });
    }

    const [prefix, token] = authorization.split(" ");
    if (!token || !prefix) {
      return res.status(401).json({ message: "Invalid authorization format" });
    }

    let SIGNATURE_TOKEN: string | undefined;

    if (prefix.toLowerCase() === "admin") {
      SIGNATURE_TOKEN = process.env.SIGNATURE_TOKEN_ADMIN;
    } else if (prefix.toLowerCase() === "bearer") {
      SIGNATURE_TOKEN = process.env.SIGNATURE_TOKEN_USER;
    } else {
      return res.status(401).json({ message: "Invalid token prefix" });
    }

    if (!SIGNATURE_TOKEN) {
      return res.status(500).json({ message: "Server token configuration missing" });
    }

    const decoded = verifyToken({ token, SIGNATURE: SIGNATURE_TOKEN }) as jwt.JwtPayload;

    if (!decoded?.id) {
      return res.status(401).json({ message: "Invalid token payload" });
    }

    const [user] = await db.select().from(users).where(eq(users.id, decoded.id)).limit(1);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

  
    req.user = user;
    next();
  } catch (error: any) {
    console.error("Auth middleware error:", error);
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};
