import expressAsyncHandler from "express-async-handler";
import ProductSize from "../../schemas/products/size.schema";

const saveProductSize = expressAsyncHandler(async (req, res) => {

    const { productId, size } = req.body
    try {
        const saveRecord = await ProductSize.create({ product: productId, size })

        if (saveRecord) {
            res.status(200).send({ response: saveRecord })
        }
        else {
            res.status(400).send({ esponse: 'Failed to add product size' })
        }
    }
    catch (error) {
        res.status(500).send({ response: 'Server Error, Failed to add product size' })
    }
})

const getProductsSize = (expressAsyncHandler(async (req, res) => {

    const { productId } = req.params
    try {
        const getRecord = await ProductSize.find({ product: productId }).lean()

        if (getRecord) {
            res.status(200).send({ response: getRecord })
        }
        else[
            res.status(400).send({ response: 'Failed to get products' })
        ]
    }
    catch (errror) {
        res.status(500).send({ response: 'Server Error, Failed to get products' })
    }
}))

const editProductSize = expressAsyncHandler(async (req, res) => {
    const { productSizeId } = req.params
    const { size } = req.body
    try {
        const editRecord = await ProductSize.findByIdAndUpdate(
            { _id: productSizeId },
            { size },
            { new: true }
        )

        if (editRecord) {
            res.status(200).send({ response: editRecord })
        }
        else {
            res.status(400).send({ response: 'Failed to edit product size' })
        }
    }
    catch (error) {
        res.status(500).send({ response: 'Failed to edit product size' })
    }
})

const deleteProductSize = expressAsyncHandler(async (req, res) => {
    const { productSizeId } = req.params
    try {
        const deleteRecord = await ProductSize.findByIdAndDelete({ _id: productSizeId })
        if (deleteRecord) {
            res.status(200).send({ response: deleteRecord })
        }
        else {
            res.status(400).send({ response: 'Failed to delete product size' })
        }
    }
    catch (error) {
        res.status(500).send({ response: 'Failed to delete product size' })
    }
})

export default { saveProductSize, getProductsSize, editProductSize, deleteProductSize }