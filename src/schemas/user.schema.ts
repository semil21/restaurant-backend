import mongoose, { Document, Model } from "mongoose";
import bcrypt from "bcrypt";

interface IUser {
    firstName: string;
    lastName: string;
    contact: string;
    alternateContact?: string | null;
    email: string;
    password: string;
    isVerified?: boolean;
}

interface IUserDocument extends IUser, Document { }

interface IUserModel extends Model<IUserDocument> {
    // Add any static methods here if needed
}

const userSchema = new mongoose.Schema<IUserDocument>({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    contact: {
        type: String,
        required: true
    },
    alternateContact: {
        type: String,
        default: null
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    isVerified: {
        type: Boolean,
        default: false
    }
});

userSchema.pre<IUserDocument>('save', async function (next) {
    if (this.isModified('password')) {
        const saltRounds = 10;
        const salt = await bcrypt.genSalt(saltRounds);
        this.password = await bcrypt.hash(this.password, salt);
    }
    next();
});

userSchema.pre('findOneAndUpdate', async function (this: mongoose.Query<IUserDocument, IUserDocument>) {
    const update = this.getUpdate() as Partial<IUser>;
    if (update.password) {
        const saltRounds = 10;
        const salt = await bcrypt.genSalt(saltRounds);
        update.password = await bcrypt.hash(update.password, salt);
    }
});

const User = mongoose.model<IUserDocument, IUserModel>("User", userSchema);

export default User;

// If you still want to use CreateUserDto, you can define it like this:
export type CreateUserDto = Omit<IUser, 'isVerified'>;