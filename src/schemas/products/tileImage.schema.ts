import mongoose from "mongoose"

const tileSchema = new mongoose.Schema({
    color: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "ProductColor"
    },
    image: {
        type: String,
    },
})

const TileImage = mongoose.model('TileImage', tileSchema)

export default TileImage