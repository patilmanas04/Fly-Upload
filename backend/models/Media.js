const mongoose = require('mongoose')
const schema = mongoose.Schema

const mediaSchema = new schema({
    user: {
        type: schema.Types.ObjectId,
        ref: 'users'
    },
    title: {
        type: String,
        required: true
    },
    mediaType: {
        type: String,
        required: true
    },
    mediaLink: {
        type: String,
        required: true
    },
    mediaSize: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
})

const Media = mongoose.model('media', mediaSchema)
module.exports = Media