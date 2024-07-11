import mongoose from "mongoose";

const productColorSchema = new mongoose.Schema({
    size: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "ProductSize",
        require: true
    },
    color: {
        type: String,
        require: true
    },
    quantity: {
        type: Number,
        require: true
    },
    status: {
        type: Boolean,
        default: true
    }
})

const ProductColor = mongoose.model("ProductColor", productColorSchema)

export default ProductColor
