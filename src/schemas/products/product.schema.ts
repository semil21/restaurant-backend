import mongoose from "mongoose"

const productSchema = new mongoose.Schema({
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
    brand: {
        type: String,
        require: true
    },
    gender: {
        type: String,
        enum: ['male', 'female', 'unisex'],
        default: null
    },
    status: {
        type: Boolean,
        default: true
    }
})

const Product = mongoose.model("Product", productSchema)

export default Product