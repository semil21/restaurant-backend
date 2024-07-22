import mongoose from "mongoose"

const productSchema = new mongoose.Schema({
    brand: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category"
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category"
    },
    subCategory: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "SubCategory"
    },
    name: {
        type: String,
        require: true
    },
    description: {
        type: String
    },
    material: {
        type: String
    },
    origin: {
        type: String
    },
    manufacturer: {
        type: String
    },
    gender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Gender"
    },
    status: {
        type: Boolean,
        default: true
    }
})

const Product = mongoose.model("Product", productSchema)

export default Product