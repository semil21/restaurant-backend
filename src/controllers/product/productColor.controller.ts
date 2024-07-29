import { error } from "console";
import ProductColor from "../../schemas/products/color.schema";
import expressAsyncHandler from "express-async-handler";
import mongoose from "mongoose";

const saveProductColor = expressAsyncHandler(async (req, res) => {

    try {
        const saveRecord = await ProductColor.create(req.body)

        if (saveRecord) {
            res.status(200).send({ response: saveRecord })
        }
        else {
            res.status(400).send({ response: 'Failed to add product color' })
        }
    }
    catch (error) {
        res.status(200).send({ response: 'Server ' })
    }
})

const getProductColors = expressAsyncHandler(async (req, res) => {

    const { product, size } = req.body

    const getProdutsPipeline = [
        {
            $match: {
                product: new mongoose.Types.ObjectId(product),
                size: new mongoose.Types.ObjectId(size)
            }
        },
        {
            $project: {
                _id: 1,
                name: 1,
                stock: 1,
                price: 1,
                discount: 1,
                status: 1,
                product: 1

            }
        }
    ]

    const getRecords = await ProductColor.aggregate(getProdutsPipeline)

    if (getRecords) {
        res.status(200).send({ response: getRecords })
    }
    else {
        res.status(200).send({ response: 'Failed  to get colors data' })
    }
})

const editProductColor = expressAsyncHandler(async (req, res) => {
    const { productColorId } = req.params


    const { productId, sizeId, name, stock } = req.body
    const editRecord = await ProductColor.findByIdAndUpdate(
        { _id: productColorId },
        req.body,
        { new: true }
    )

    if (editRecord) {
        res.status(200).send({ response: editRecord })
    }
    else {
        res.status(400).send({ response: 'Failed to edit product color' })
    }
})

const deleteProductColor = expressAsyncHandler(async (req, res) => {

    const { productColorId } = req.params

    const deleteRecord = await ProductColor.findByIdAndDelete({ _id: productColorId }, { new: true })

    if (deleteRecord) {
        res.status(200).send({ response: deleteRecord })
    }
    else {
        res.status(400).send({ response: 'Failed to delete product color' })
    }
})

const handleColorStatus = expressAsyncHandler(async (req, res) => {
    const { id } = req.params
    const { newStatus } = req.body
    try {
        const updateRecord = await ProductColor.findByIdAndUpdate(
            { _id: id },
            { status: newStatus },
            { new: true }
        )

        if (updateRecord) {
            res.status(200).send({ response: updateRecord })
        }
        else {
            res.status(500).send({ response: 'Failed to update color status' })
        }


    }
    catch (error) {
        res.status(500).send({ response: 'Server error, Failed to update color status' })
    }
})


export default { saveProductColor, getProductColors, editProductColor, deleteProductColor, handleColorStatus }