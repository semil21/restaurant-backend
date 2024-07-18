import mongoose from "mongoose";

const subCategorySchema = new mongoose.Schema({
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category"
    },
    name: {
        type: String,
    },
    gender: {
        type: String,
        enum: ['male', 'female', 'unisex']
    },
    status: {
        type: Boolean,
        default: true
    }
}, { timestamps: true })

const SubCategory = mongoose.model('SubCategory', subCategorySchema)

export default SubCategory