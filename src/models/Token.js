import mongoose from 'mongoose'
import jwt from 'jsonwebtoken';

const TOKEN_EXPIRED = process.env.TOKEN_EXPIRED || '3600000'
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET || 'refreshToken'
const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET || 'tokenScret'

const { Schema } = mongoose

function generateAccessToken(data) {
    return jwt.sign(data, ACCESS_TOKEN_SECRET, { expiresIn: TOKEN_EXPIRED });
}

export const TokenSchema = new Schema({
    accessToken: { type: String, required: true },
    refreshToken: { type: String, required: true },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    expiredIn: { type: Number },
    expiredAt: { type: Number },
    tokenType: {
        type: String,
        enum: ['jwt'],
        default: 'jwt'
    },
}, {
    timestamps: true
})



TokenSchema.statics.createToken = async function (user) {

    let expiredAt = new Date()


    expiredAt.setMilliseconds(expiredAt.getMilliseconds() + parseInt(TOKEN_EXPIRED))

    // let accessToken = generateAccessToken({ _id, email, rule: [], expired_at: expired_at.getTime(), expired_in: parseInt(this.expiresIn) })
    let accessToken = generateAccessToken({ user });
    let refreshToken = jwt.sign({ user }, REFRESH_TOKEN_SECRET);

    let result = new this({
        accessToken,
        refreshToken,
        user: user._id,
        expiredAt: expiredAt.getTime(),
        expiredIn: parseInt(TOKEN_EXPIRED)
    })

    let token = await result.save();

    return token;
}



TokenSchema.statics.refreshToken = function (refreshToken) {

    return new Promise((resolve, reject) => {
        jwt.verify(refreshToken, REFRESH_TOKEN_SECRET, (err, user) => {
            if (err) return cacheError(err, res)
            const accessToken = generateAccessToken(user)

            return resolve(accessToken)
        })
    })


}


export default mongoose.model('token', TokenSchema)
