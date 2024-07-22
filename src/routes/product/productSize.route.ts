import ProductSizeController from "../../controllers/product/productSize.controller"
import express from 'express'

const productSizeRouter = express.Router()

productSizeRouter.post("/create", ProductSizeController.saveProductSize)
productSizeRouter.post("/get/:productId", ProductSizeController.getProductsSize)
productSizeRouter.put("/:productSizeId", ProductSizeController.editProductSize)
productSizeRouter.put("/status/:id", ProductSizeController.updateSizeStatus)
productSizeRouter.delete("/:productSizeId", ProductSizeController.deleteProductSize)

export default productSizeRouter