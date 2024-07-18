import categoryController from "../../controllers/category/category.controller";
import express from "express"

const categoryRouter = express.Router()

categoryRouter.get("/", categoryController.getCategories)
categoryRouter.get("/active-categories", categoryController.getActiveCategories)
categoryRouter.post("/new", categoryController.createNewCategory)
categoryRouter.put("/update/:categoryId", categoryController.updateCategory)
categoryRouter.put("/status/:categoryId", categoryController.updateCategoryStatus)
categoryRouter.delete("/delete/:categoryId", categoryController.deleteCategory)

export default categoryRouter