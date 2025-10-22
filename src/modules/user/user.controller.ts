import type {Request, Response,NextFunction } from "express";
import { db } from "../../db/DBconnection.js";
import { users } from "../../db/schema.js";
import { eq } from "drizzle-orm";
import { Hash } from "../../utilits/hash/hashing.js";



export const signUp = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { role, name, email, password } = req.body
    
    const emailExists = await db.query.users.findFirst({
      where: eq(users.email, email),
    });

    if (emailExists) {
      return next(new Error("Email already exists"));
    }

    const hashedPassword = await Hash({
      password,
      SALT_ROUNDS: process.env.SALT_ROUNDS,
    });

    const [newUser] = await db
      .insert(users)
      .values({
        role,
        name,
        email,
        password: hashedPassword,
      
      })
      .returning(); 

    return res.status(201).json({
      msg: "done",
      user: newUser,
    });
  } catch (error) {
    next(error);
  }
};