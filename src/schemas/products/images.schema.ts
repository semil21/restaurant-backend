import mongoose, { Mongoose } from "mongoose";

const productImageSchema = new mongoose.Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product"
    },
    tileImage: {
        type: String
    },
    images: [
        {
            type: String
        }
    ]
})

const ProductImage = mongoose.model("ProductImage", productImageSchema)

export default ProductImage