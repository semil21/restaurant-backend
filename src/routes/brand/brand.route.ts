import brandController from "../../controllers/brand/brand.controller";
import express from "express"

const brandRouter = express.Router()

brandRouter.get("/", brandController.getBrands)
brandRouter.get("/active-brands", brandController.getActiveBrands)
brandRouter.post("/add", brandController.createNewBrand)
brandRouter.put("/update-status/:brandId", brandController.updateBrandStatus)

export default brandRouter