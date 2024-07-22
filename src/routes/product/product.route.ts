import productController from '../../controllers/product/product.controller'
import express from "express"

const productRouter = express.Router()

productRouter.get("/get-products", productController.getProducts)
productRouter.post("/create", productController.createNewProduct)
productRouter.post("/products-details/:productId", productController.getProductDetails)

export default productRouter