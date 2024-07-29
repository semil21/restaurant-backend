import mongoose from "mongoose";

const imagesSchema = new mongoose.Schema({

    color: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "ProductColor"
    },
    image: {
        type: String
    },
    status: {
        type: Boolean,
        default: true
    }
})

const Image = mongoose.model("Image", imagesSchema)

export default Image