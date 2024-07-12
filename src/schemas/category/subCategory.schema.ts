import mongoose from "mongoose";

const subCategorySchema = new mongoose.Schema({
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category"
    },
    slug: {
        type: String
    },
    name: {
        type: String,
    },
    status: {
        type: Boolean,
        default: true
    }
})

const SubCategory = mongoose.model('SubCategory', subCategorySchema)

export default SubCategory