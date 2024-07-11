import mongoose, { mongo } from "mongoose";

const productSizeSchema = new mongoose.Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        require: true
    },
    size: {
        type: String,
        require: true
    },
    status: {
        type: Boolean,
        default: true
    }
})

const ProductSize = mongoose.model("ProductSize", productSizeSchema)

export default ProductSize