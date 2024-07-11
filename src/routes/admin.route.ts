import AdminCOntroller from "../controllers/admin.controller"
import express from "express"

const adminRouter = express.Router()

adminRouter.post("/new", AdminCOntroller.createNewAdmin)

export default adminRouter
