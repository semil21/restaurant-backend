import mongoose, { Document, Model } from "mongoose";
import bcrypt from "bcrypt";

interface admin {
    email: string;
    password: string;
}

interface IUserDocument extends admin, Document { }

interface IUserModel extends Model<IUserDocument> {
    // Add any static methods here if needed
}
const adminSchema = new mongoose.Schema({
    email: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    }
})


adminSchema.pre<IUserDocument>('save', async function (next) {
    if (this.isModified('password')) {
        const saltRounds = 10;
        const salt = await bcrypt.genSalt(saltRounds);
        this.password = await bcrypt.hash(this.password, salt);
    }
    next();
});

adminSchema.pre('findOneAndUpdate', async function (this: mongoose.Query<IUserDocument, IUserDocument>) {
    const update = this.getUpdate() as Partial<admin>;
    if (update.password) {
        const saltRounds = 10;
        const salt = await bcrypt.genSalt(saltRounds);
        update.password = await bcrypt.hash(update.password, salt);
    }
});

const Admin = mongoose.model("Admin", adminSchema)

export default Admin
