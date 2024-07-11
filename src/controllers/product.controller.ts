import Product from "../schemas/product.schema";
import expressAsyncHandler from "express-async-handler";

const createNewProduct = expressAsyncHandler(async (req, res) => {

    const { category, name, brand, gender, status } = req.body

    try {
        const saveProduct = await Product.create({ category, name, brand, gender, status })

        if (saveProduct) {
            res.status(200).send({ response: saveProduct })
        }
        else {
            res.status(400).send({ response: 'Failed to create new product' })
        }
    }
    catch (error) {
        res.status(500).send({ response: 'Server Error, Failed to create product' })
    }
})

const getProducts = expressAsyncHandler(async (req, res) => {
    const { categoryId } = req.params
    try {
        const searchRecords = await Product.find(
            { category: categoryId }
        )

        if (searchRecords) {
            res.status(200).send({ response: searchRecords })
        }
    }
    catch (error) {
        res.status(500).send({ response: 'Server erroe, failed to get products' })
    }
})

const editProduct = expressAsyncHandler(async (req, res) => {

    const { productId } = req.params
    const { data } = req.body

    try {
        const updateRecord = await Product.findByIdAndUpdate(
            { _id: productId },
            { data },
            { new: true }
        )

        if (updateRecord) {
            res.status(200).send({ response: updateRecord })
        }
        else {
            res.status(400).send({ response: 'Failed to update product' })
        }
    }
    catch (error) {
        res.status(500).send({ response: 'Server error, failed to edit product' })
    }
})

export default { createNewProduct, editProduct, getProducts }