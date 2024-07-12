import mongoose, { mongo } from "mongoose";

const productColorSchema = new mongoose.Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product"
    },
    size: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "ProductSize"
    },
    name: {
        type: String
    },
    stock: {
        type: Number
    },
    status: {
        type: Boolean,
        default: true
    }
})

const ProductColor = mongoose.model("ProductColor", productColorSchema)

export default ProductColor