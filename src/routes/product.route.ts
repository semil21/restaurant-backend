import productController from '../controllers/product.controller'
import express from "express"

const productRouter = express.Router()

productRouter.post("/create", productController.createNewProduct)
productRouter.post("/get-products/:categoryId", productController.getProducts)

export default productRouter