import categoryController from "../../controllers/category/category.controller";
import express from "express"

const categoryRouter = express.Router()

categoryRouter.get("/", categoryController.getCategories)
categoryRouter.post("/new", categoryController.createNewCategory)
categoryRouter.put("/update/:categoryId", categoryController.updateCategory)
categoryRouter.delete("/delete/:categoryId", categoryController.deleteCategory)

export default categoryRouter