const mongoose = require('mongoose');
const User = require('./user.model');

const likeSchema = mongoose.Schema(
    {
        placeId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            index: true,
        },
        type: {
            type: String,
            required: true,
            trim: true,
        },
        like: {
            type: Boolean,
            default: false,
        },
        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            index: true,
            ref: User,
        },
    },
    {
        timestamps: true,
    }
);

const Likes = mongoose.model('likes', likeSchema);

module.exports = Likes;
