import { Router } from "express"
import { deleteAccount, getAllUsers, getProfile, signIn, signUp, updateName, updatePassword } from "./user.controller.js"
import { signInValidation, signUpValidation, updateNameValidation, updatePasswordValidation } from "./user.validation.js"
import { validate } from "../../middleWare/validation.js"
import { authentication, authorization } from "../../middleWare/auth.js"

const userRouter = Router()

userRouter.post("/signUp",signUpValidation,validate ,signUp)
userRouter.post("/signIn",signInValidation, validate,signIn)
userRouter.get("/getProfile",authentication,getProfile)
userRouter.patch("/updatePassword",updatePasswordValidation,validate,authentication,updatePassword)
userRouter.patch("/updateName",updateNameValidation,validate,authentication,updateName)
userRouter.delete("/deleteAccount",authentication,deleteAccount)
userRouter.get("/getAll",authentication,authorization ,getAllUsers)
export default userRouter
