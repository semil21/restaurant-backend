import { response } from "express";
import Category from "../schemas/category.schema";
import expressAsyncHandler from "express-async-handler";

const createNewCategory = expressAsyncHandler(async (req, res) => {
    try {
        const saveCategory = await Category.create(req.body)

        if (saveCategory) {
            res.status(200).send({ response: saveCategory })
        }
        else {
            res.status(500).send({ response: 'Failed to create new category' })
        }
    }
    catch (error) {
        res.status(500).send({ response: 'Server Error, Failed to create category' })
    }
})

const getCategories = expressAsyncHandler(async (req, res) => {
    try {
        const getData = await Category.find()

        if (getData) {
            res.status(200).send({ response: getData })
        }
        else {
            res.status(400).send({ response: 'Faile to get categories ' })
        }
    }
    catch (error) {
        res.status(500).send({ response: 'Server Error, Failed to get categories' })
    }
})

const updateCategory = expressAsyncHandler(async (req, res) => {
    const { categoryId } = req.params
    const { name } = req.body
    try {
        const updateRecord = await Category.findByIdAndUpdate(
            { _id: categoryId },
            { name },
            { new: true }
        )

        if (updateRecord) {
            res.status(200).send({ response: updateRecord })
        }
        else {
            res.status(500).send({ response: 'Failed to update category' })
        }
    }
    catch (error) {
        res.status(500).send({ response: ' Server Error, Failed to update category' })
    }
})

const deleteCategory = expressAsyncHandler(async (req, res) => {
    const { categoryId } = req.params
    try {
        const deleteRecord = await Category.findByIdAndDelete(
            { _id: categoryId },
            { new: true }
        )

        if (deleteRecord) {
            res.status(200).send({ response: deleteRecord })
        }
        else {
            res.status(400).send({ response: 'Failed todelete category' })

        }
    }
    catch (error) {
        res.status(500).send({ response: 'Server Error, failed to delete Category' })
    }
})

export default { createNewCategory, getCategories, updateCategory, deleteCategory }