import productController from '../../controllers/product/product.controller'
import express from "express"

const productRouter = express.Router()

productRouter.get("/get-products", productController.getProducts)
productRouter.post("/create", productController.createNewProduct)
productRouter.post("/products-details/:productId", productController.getProductDetails)
productRouter.put("/feature-status/:productId", productController.handleFeaturedStatus)
productRouter.put("/arrival-status/:productId", productController.handleNewArrivalStatus)

export default productRouter