import SubCategory from "../../schemas/category/subCategory.schema";
import expressAsyncHandler from "express-async-handler";

const saveSubCategory = expressAsyncHandler(async (req, res) => {

    const { categoryId, subCategory } = req.body
    try {
        const saveRecord = await SubCategory.create({ category: categoryId, name: subCategory })

        if (saveRecord) {
            res.status(200).send({ response: saveRecord })
        }
        else {
            res.status(500).send({ response: 'Failed to create new sub category' })
        }
    }
    catch (error) {
        res.status(500).send({ response: "Server Error, Failed to create sub category" })
    }
})

const getSubCategories = expressAsyncHandler(async (req, res) => {
    const { categoryId } = req.params
    try {
        const getData = await SubCategory.find(
            { category: categoryId }
        ).lean()
        if (getData) {
            res.status(200).send({ response: getData })
        }
        else {
            res.status(500).send({ response: 'Failed to get sub categories' })
        }
    }
    catch (error) {
        res.status(500).send({ response: 'Server Error, Failed to get sub categories' })
    }
})

const editSubCategory = expressAsyncHandler(async (req, res) => {
    const { subCategoryId } = req.params
    const { subCategory } = req.body
    try {
        const updateRecord = await SubCategory.findByIdAndUpdate(
            { _id: subCategoryId },
            { name: subCategory },
            { new: true }
        )
        if (updateRecord) {
            res.status(200).send({ response: updateRecord })
        }
        else {
            res.status(500).send({ response: 'Failed to update sub category' })
        }
    }
    catch (error) {
        res.status(500).send({ response: 'Server Error, Failed to update sub category' })
    }
})

const deleteSubCategory = expressAsyncHandler(async (req, res) => {
    const { subCategoryId } = req.params
    try {
        const deleteRecord = await SubCategory.findByIdAndDelete(
            { _id: subCategoryId },
            { new: true }
        )
        if (deleteRecord) {
            res.status(200).send({ response: deleteRecord })
        }
        else {
            res.status(500).send({ response: 'Failed to delete sub category' })
        }
    }
    catch (error) {
        res.status(500).send({ response: 'Server Error, Failed to delete sub category' })
    }
})

export default { saveSubCategory, getSubCategories, editSubCategory, deleteSubCategory }