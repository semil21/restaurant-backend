import subCategoryController from "../../controllers/category/subCategory.controller"
import express from "express"

const subCategoryRouter = express.Router()

subCategoryRouter.post("/create", subCategoryController.saveSubCategory)
subCategoryRouter.post("/get-sub-category/:categoryId", subCategoryController.getSubCategories)
subCategoryRouter.put("/:subCategoryId", subCategoryController.editSubCategory)
subCategoryRouter.delete("/:subCategoryId", subCategoryController.deleteSubCategory)

export default subCategoryRouter