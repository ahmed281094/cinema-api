import { Router } from "express"
import { signUp } from "./user.controller.js"
import { signUpValidation } from "./user.validation.js"
import { validate } from "../../middleWare/validation.js"

const userRouter = Router()

userRouter.post("/signUp",signUpValidation,validate ,signUp)


export default userRouter