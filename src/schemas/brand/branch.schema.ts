import mongoose from "mongoose";

const brandSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true
    },
    description: {
        type: String
    },
    origin: {
        type: String
    },
    status: {
        type: Boolean,
        default: true
    }
})

const Brand = mongoose.model("Brand", brandSchema)

export default Brand