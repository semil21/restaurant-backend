import productController from '../../controllers/product/product.controller'
import express from "express"

const productRouter = express.Router()

productRouter.post("/create", productController.createNewProduct)
productRouter.get("/get-products", productController.getProducts)
productRouter.post("/get-categorized-products/:categoryId", productController.getCategorizedProducts)
productRouter.delete("/:productId", productController.getCategorizedProducts)

export default productRouter