import mongoose from 'mongoose'

const { Schema } = mongoose
const DeparmentSchema = new Schema({
    name: String,
    manager: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
}, {
    timestamps: true
})


export default mongoose.model('Department', DeparmentSchema)
