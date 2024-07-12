import ProductSizeController from "../../controllers/product/productSize.controller"
import express from 'express'

const productSizeRouter = express.Router()

productSizeRouter.post("/create", ProductSizeController.saveProductSize)
productSizeRouter.post("/:productId", ProductSizeController.getProductsSize)
productSizeRouter.put("/:productSizeId", ProductSizeController.editProductSize)
productSizeRouter.delete("/:productSizeId", ProductSizeController.deleteProductSize)

export default productSizeRouter