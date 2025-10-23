import type { Request, Response, NextFunction } from "express";
import { db } from "../../db/DBconnection.js";
import { users } from "../../db/schema.js";
import { eq } from "drizzle-orm";
import { Hash } from "../../utilits/hash/hashing.js";
import { compareHashing } from "../../utilits/hash/compareHashing.js";
import { generateToken } from "../../utilits/token/generateToken.js";



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

      await db
      .insert(users)
      .values({
        role:"user",
        name,
        email,
        password: hashedPassword,
      })
      .returning();

    return res.status(201).json({
      msg: "done",
     
    });
  } catch (error) {
    next(error);
  }
};



export const signIn = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;

    const [user] = await db
      .select()
      .from(users)
      .where(eq(users.email, email))
      .limit(1);

    if (!user) {
      return res.status(404).json({ message: "Email does not exist" });
    }

    const isMatch = await compareHashing({ password, hashed: user.password });
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid password" });
    }

    const SIGNATURE =
      user.role === "user"
        ? process.env.SIGNATURE_TOKEN_USER
        : process.env.SIGNATURE_TOKEN_ADMIN

    if (!SIGNATURE) {
      return res.status(500).json({ message: "Server configuration missing SIGNATURE" })
    }

    const token = generateToken({
      payload: { id: user.id, email: user.email },
      SIGNATURE,
      option: { expiresIn: "1d" },
    });

    return res.status(200).json({
      success: true,
      message: "Login successful",
      token,
    })
  } catch (error: any) {

    return res.status(500).json({ message: "Internal server error", error })
  }
}



export const getProfile = async (req: Request, res: Response, next: NextFunction) => {

  try {
    const user = req.user as any;

    const [getUser] = await db
      .select({
        id: users.id,
        name: users.name,
        email: users.email,
        createdAt: users.createdAt,
      })
      .from(users)
      .where(eq(users.id, user.id));

    if (!getUser) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({message:"done",
      user: getUser,
    });
  } catch (error) {
    return res.status(404).json({
      message: "user not found"
    })
  }

}


export const updatePassword = async (req: Request, res: Response, next: NextFunction) => {
try {
  const { oldPassword, newPassword } = req.body
  const user = req.user as any

  const isMatch = await compareHashing({ password: oldPassword, hashed: user.password })
  if (!isMatch) {
    return res.status(400).json({ message: "old password is wrong" })
  }
  const hashedNew = await Hash({ password: newPassword, SALT_ROUNDS: Number(process.env.SALT_ROUNDS) })

  await db.update(users).set({ password: hashedNew }).where(eq(users.id, user.id))
  return res.status(200).json({ message: "password updated successefully" })
} catch (error) {
   return res.status(500).json({ message: "Internal server error", error })
}
  
}

export const updateName = async (req:Request,res:Response,next:NextFunction)=>{
try {
const {name}=req.body
const [updateName]=await db.update(users)
.set({name}).
where(eq(users.id,(req.user as any).id)).returning()
return res.status(200).json({ message:"name updated successfully",updateName})
} catch (error) {
  return res.status(500).json({ message: "Internal server error", error })
}
}



export const deleteAccount = async (req:Request,res:Response,next:NextFunction) => {

try {
  await db.delete(users).where(eq(users.id,(req.user as any).id))
  return res.status(200).json({message: "account deleted successfully"})
} catch (error) {
  return res.status(500).json({ message: "Internal server error", error })
}

}

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const allUsers = await db.select(
      {
        id: users.id,
        name: users.name,
        email: users.email,
        createdAt: users.createdAt,
      }

    ).from(users);
    return res.status(200).json({ success: true, users: allUsers });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Internal server error", error });
  }
};
