import Product from "../../schemas/products/product.schema";
import ProductColor from "../../schemas/products/color.schema";
import ProductImage from "../../schemas/products/images.schema";
import ProductSize from "../../schemas/products/size.schema";
import expressAsyncHandler from "express-async-handler";

const createNewProduct = expressAsyncHandler(async (req, res) => {

    const { category, name, brand, gender } = req.body

    try {
        const saveProduct = await Product.create({ category, name, brand, gender })

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
    try {
        const searchRecords = await Product.find().lean()

        if (searchRecords) {
            res.status(200).send({ response: searchRecords })
        }
    }
    catch (error) {
        res.status(500).send({ response: 'Server erroe, failed to get products' })
    }
})

const getCategorizedProducts = expressAsyncHandler(async (req, res) => {

    const { categoryId } = req.params

    const getProducts = await Product.find({ category: categoryId }).lean()

    if (getProducts) {
        res.status(200).send({ response: getProducts })
    }
    else {
        res.status(400).send({ response: 'Failed to get categorized products' })

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

const deleteProduct = expressAsyncHandler(async (req, res) => {
    const { productId } = req.params
    try {
        const deleteRecord = await Product.findByIdAndDelete(
            { _id: productId },
            { new: true }
        )
        if (deleteRecord) {
            res.status(200).send({ response: deleteRecord })

            const deleteProductColors = await ProductColor.deleteMany({ product: productId })
            const deleteProductImages = await ProductImage.deleteMany({ product: productId })
            const deleteProductSizes = await ProductSize.deleteMany({ product: productId })
        }
        else {
            res.status(400).send({ response: 'Failed to delete product' })
        }
    }
    catch (error) {
        res.status(500).send({ response: 'Server Error, Failed to delete product' })
    }
})

export default { createNewProduct, editProduct, getProducts, getCategorizedProducts, deleteProduct }