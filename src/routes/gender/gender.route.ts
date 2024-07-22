import genderController from "../../controllers/gender/gender.controller"
import express from "express"

const genderRouter = express.Router()

genderRouter.get("/", genderController.getGenderData)
genderRouter.post("/create", genderController.saveGender)

export default genderRouter









