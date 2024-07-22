import mongoose from "mongoose";

const productSizeSchema = new mongoose.Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product"
    },
    size: {
        type: String,
    },
    length: {
        type: String
    },
    width: {
        type: String
    },
    status: {
        type: Boolean,
        default: true
    }
})

const ProductSize = mongoose.model("ProductSize", productSizeSchema)

export default ProductSize