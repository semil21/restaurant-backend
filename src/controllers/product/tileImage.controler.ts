import TileImage from "../../schemas/products/tileImage.schema";
import expressAsyncHandler from "express-async-handler";
import mongoose from "mongoose";

const saveTileImage = expressAsyncHandler(async (req, res) => {
    try {

        const saveRecord = await TileImage.create(req.body)

        if (saveRecord) {
            res.status(200).send({ response: saveRecord })
        }
        else {
            res.status(400).send({ response: 'Failed to save tile image' })

        }
    }
    catch (error) {
        res.status(500).send({ response: 'Failed to save tile image' })
    }
})

const getTileImage = expressAsyncHandler(async (req, res) => {

    const { color } = req.params
    try {
        const getTileImagePipeine = [
            {
                $match: {
                    color: new mongoose.Types.ObjectId(color)
                }
            }
        ]

        const getRecords = await TileImage.aggregate(getTileImagePipeine)

        if (getRecords) {
            res.status(200).send({ response: getRecords })
        }
        else {
            res.status(400).send({ response: 'Failed to get tile image' })
        }

    }
    catch (error) {
        res.status(500).send({ response: 'Failed to get tile images' })
    }
})

const editTileImage = expressAsyncHandler(async (req, res) => {
    const { id } = req.params
    const { image } = req.body

    try {
        const updateRecord = await TileImage.findByIdAndUpdate(
            { _id: id },
            { image: image },
            { new: true }
        )

        if (updateRecord) {
            res.status(200).send({ response: updateRecord })
        }
        else {

            res.status(400).send({ response: 'Failed to update tile image' })
        }
    }
    catch (error) {
        res.status(500).send({ response: 'Failed to update image title' })

    }
})

export default { saveTileImage, getTileImage, editTileImage }