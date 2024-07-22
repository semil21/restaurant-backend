import mongoose from "mongoose";

const genderSchema = new mongoose.Schema({
    name: {
        type: String
    },
    status: {
        type: Boolean,
        default: true
    },
})

const Gender = mongoose.model("Gender", genderSchema)

export default Gender