import { Router } from "express";
import { addHall, deleteHall, getAllHalls, updateHall } from "./halls.controller.js";
import { authentication, authorization } from "../../middleWare/auth.js";
import { addHallValidation } from "./halls.validation.js";
import { validate } from "../../middleWare/validation.js";

const hallsRouter = Router()




hallsRouter.post("/addHall",addHallValidation,validate,authentication,authorization,addHall)

hallsRouter.get("/getAllHalls",authentication,authorization,getAllHalls)
hallsRouter.patch("/updateHall/:id",authentication,authorization,updateHall)
hallsRouter.delete("/deleteHall/:id",authentication,authorization,deleteHall)
export default hallsRouter