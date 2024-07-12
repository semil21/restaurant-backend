import ProductColor from "../../schemas/products/color.schema";
import expressAsyncHandler from "express-async-handler";

const saveProductColor = expressAsyncHandler(async (req, res) => {
    const { productId, sizeId, name, stock } = req.body
    try {
        const saveRecord = await ProductColor.create({ product: productId, size: sizeId, name, stock })

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

    const { productId, sizeId, } = req.body

    const getRecords = await ProductColor.find({ product: productId, size: sizeId }).lean()

    if (getRecords) {
        res.status(200).send({ response: getRecords })
    }
    else {
        res.status(400).send({ response: 'Failed to get product colors' })
    }
})

const editProductColor = expressAsyncHandler(async (req, res) => {
    const { productColorId } = req.params

    const { productId, sizeId, name, stock } = req.body
    const editRecord = await ProductColor.findByIdAndUpdate(
        { _id: productColorId },
        { product: productId, size: sizeId, name, stock },
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


export default { saveProductColor, getProductColors, editProductColor, deleteProductColor }