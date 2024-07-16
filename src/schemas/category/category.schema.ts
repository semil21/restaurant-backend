import mongoose from "mongoose"

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true
    },
    status: {
        type: Boolean,
        default: true
    },
}, { timestamps: true })

const Category = mongoose.model("Category", categorySchema)

export default Category