import UserController from "../controllers/user.controller"
import express from "express"

const userRouter = express.Router()

userRouter.post("/create", UserController.createNewUser)
userRouter.post("/login", UserController.userLogin)
userRouter.put("/update/:userId", UserController.updateUser)


export default userRouter
