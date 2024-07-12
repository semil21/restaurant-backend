import mongoose from "mongoose";

const brandLogoSchema = new mongoose.Schema({
    brand: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Brand"
    },
    logo: {
        type: String
    }
})

const BrandLogo = mongoose.model("BrandLogo", brandLogoSchema)

export default BrandLogo