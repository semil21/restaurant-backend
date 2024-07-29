import Image from "../../schemas/products/images.schema";
import expressAsyncHandler from "express-async-handler";
import mongoose from "mongoose"

const saveImage = expressAsyncHandler(async (req, res) => {
    try {

        const saveRecord = await Image.create(req.body)

        if (saveRecord) {
            res.status(200).send({ response: saveRecord })
        }
        else {
            res.status(400).send({ response: 'Failed to save image' })
        }
    }
    catch (error) {
        res.status(500).send({ response: 'Server error, Failed to save image' })
    }
})


const getImages = expressAsyncHandler(async (req, res) => {
    const { id } = req.params
    try {
        const getImagesPipeline = [
            {
                $match: {
                    color: new mongoose.Types.ObjectId(id)
                }
            }
        ]

        const getRecords = await Image.aggregate(getImagesPipeline)

        if (getRecords) {
            res.status(200).send({ response: getRecords })
        }
        else {
            res.status(400).send({ response: 'Failed to get images ' })
        }

    }
    catch (error) {
        res.status(500).send({ response: 'Server error, Failed to get images' })
    }
})

const handleImageStatus = expressAsyncHandler(async (req, res) => {
    const { id } = req.params

    const { newStatus } = req.body
    try {
        const updateStatus = await Image.findOneAndUpdate(
            { _id: id },
            { status: newStatus },
            { new: true }
        )
        if (updateStatus) {
            res.status(200).send({ response: updateStatus })
        }
        else {
            res.status(400).send({ response: "Failed to update image status" })
        }
    }
    catch (error) {
        res.status(500).send({ response: 'Server error, failed to update image status' })
    }
})
export default { saveImage, getImages, handleImageStatus }
