import mongoose from "mongoose";

export const UserSchema = new mongoose.Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    name: { type: String, required: true }
}, {
    timestamps: true
})

export default mongoose.model('User', UserSchema)

