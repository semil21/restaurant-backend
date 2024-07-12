import brandController from "../../controllers/brand/brand.controller";
import express from "express"

const brandRouter = express.Router()

brandRouter.get("/", brandController.getBrands)
brandRouter.post("/add", brandController.createNewBrand)

export default brandRouter