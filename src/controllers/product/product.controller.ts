import Product from "../../schemas/products/product.schema";
import mongoose from 'mongoose';

import ProductColor from "../../schemas/products/color.schema";
import ProductSize from "../../schemas/products/size.schema";
import expressAsyncHandler from "express-async-handler";


const createNewProduct = expressAsyncHandler(async (req, res) => {
    try {
        const saveProduct = await Product.create(req.body)

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

        const productsPipeline = [
            {
                $lookup: {
                    from: "genders",
                    localField: "gender",
                    foreignField: "_id",
                    as: "result"
                }
            },
            {
                $unwind: "$result"
            },
            {
                $project: {
                    _id: 1,
                    name: 1,
                    description: 1,
                    material: 1,
                    origin: 1,
                    manufacturer: 1,
                    gender: "$result.name",
                    newArrival: 1,
                    featured: 1

                }
            }
        ]

        const searchRecords = await Product.aggregate(productsPipeline)

        if (searchRecords) {
            res.status(200).send({ response: searchRecords })
        }
    }
    catch (error) {
        res.status(500).send({ response: 'Server erroe, failed to get products' })
    }
})

const getProductDetails = expressAsyncHandler(async (req, res) => {
    const { productId } = req.params
    try {
        const getProductDetailsPipeline = [
            {
                $match: {
                    _id: new mongoose.Types.ObjectId(productId)
                }
            },
            {
                $lookup: {
                    from: "brands",
                    localField: "brand",
                    foreignField: "_id",
                    as: "brand"
                }
            },
            {
                $unwind: {
                    path: "$brand",
                    preserveNullAndEmptyArrays: true
                }
            },
            {
                $lookup: {
                    from: "categories",
                    localField: "category",
                    foreignField: "_id",
                    as: "category"
                }
            },
            {
                $unwind: {
                    path: "$category",
                    preserveNullAndEmptyArrays: true
                }
            },
            {
                $lookup: {
                    from: "subcategories",
                    localField: "subCategory",
                    foreignField: "_id",
                    as: "subCategory"
                }
            },
            {
                $unwind: {
                    path: "$subCategory",
                    preserveNullAndEmptyArrays: true
                }
            },
            {
                $lookup: {
                    from: "genders",
                    localField: "gender",
                    foreignField: "_id",
                    as: "gender"
                }
            },
            {
                $unwind: {
                    path: "$gender",
                    preserveNullAndEmptyArrays: true
                }
            },
            {
                $project: {
                    _id: 1,
                    name: 1,
                    description: 1,
                    material: 1,
                    origin: 1,
                    manufacturer: 1,
                    status: 1,
                    brand_id: "$brand._id",
                    brand_name: "$brand.name",
                    brand_description: "$brand.description",
                    brand_origin: "$brand.origin",
                    brand_status: "$brand.status",
                    category_id: "$category._id",
                    category_name: "$category.name",
                    category_status: "$category.status",
                    subcategory_id: "$subCategory._id",
                    subcategory_name: "$subCategory.name",
                    subcategory_status: "$subCategory.status",
                    gender_id: "$gender._id",
                    gender: "$gender.name",
                    gender_status: "$gender.status"
                }
            }
        ]

        const getProducts = await Product.aggregate(getProductDetailsPipeline)

        if (getProducts) {
            res.status(200).send({ response: getProducts })
        }
        else {
            res.status(400).send({ response: 'Failed to get product details' })
        }
    }


    catch (error) {
        res.status(500).send({ response: 'Server error, failed to get product details' })
    }
})



const editProduct = expressAsyncHandler(async (req, res) => {

    const { productId } = req.params
    const { data } = req.body

    try {
        const updateRecord = await Product.findByIdAndUpdate(
            { _id: productId },
            data,
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

const handleFeaturedStatus = expressAsyncHandler(async (req, res) => {
    const { productId } = req.params
    const { newStatus } = req.body

    try {
        const updateStatus = await Product.findByIdAndUpdate(
            { _id: productId },
            { featured: newStatus },
            { new: true }
        )

        if (updateStatus) {
            res.status(200).send({ response: "Status updated successfully" })
        }
        else {
            res.status(400).send({ response: 'Failed to update feature status' })
        }
    }
    catch (error) {
        res.status(500).send({ response: "Server error, failed to update featured status of the product" })
    }
})

const handleNewArrivalStatus = expressAsyncHandler(async (req, res) => {
    const { productId } = req.params
    const { newStatus } = req.body
    try {
        const updateStatus = await Product.findByIdAndUpdate(
            { _id: productId },
            { newArrival: newStatus },
            { new: true }
        )


        if (updateStatus) {
            res.status(200).send({ response: "New Arrival status updated successfully" })
        }
        else {
            res.status(500).send({ response: 'Failed to update new arrival status' })
        }
    }
    catch (error) {
        res.status(500).send({ response: "Server error, Failed to update fresh arrivals status" })
    }
})



export default { createNewProduct, editProduct, getProducts, getProductDetails, deleteProduct, handleFeaturedStatus, handleNewArrivalStatus }