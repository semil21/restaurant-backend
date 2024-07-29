import ProductColorController from "../../controllers/product/productColor.controller"
import express from "express"

const productColorRouter = express.Router()

productColorRouter.post("/create", ProductColorController.saveProductColor)
productColorRouter.post("/", ProductColorController.getProductColors)
productColorRouter.put("/:productColorId", ProductColorController.editProductColor)
productColorRouter.put("/status/:id", ProductColorController.handleColorStatus)
productColorRouter.delete("/:productColorId", ProductColorController.deleteProductColor)

export default productColorRouter