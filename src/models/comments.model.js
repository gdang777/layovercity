const mongoose = require('mongoose');
const User = require('./user.model');
const Place = require('./places.model');

const commentsSchema = mongoose.Schema(
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
        description: {
            type: String,
            required: true,
            trim: true,
        },
        children: [
            {
                placeId: {
                    type: mongoose.Schema.Types.ObjectId,
                    required: true,
                    index: true,
                    ref: Place,
                },
                type: {
                    type: String,
                    required: true,
                    trim: true,
                },
                description: {
                    type: String,
                    required: true,
                    trim: true,
                },
                createdBy: {
                    type: mongoose.Schema.Types.ObjectId,
                    required: true,
                    index: true,
                    ref: User,
                },
                parentCommentId: {
                    type: mongoose.Schema.Types.ObjectId,
                    required: true,
                    index: true,
                },
            },
        ],
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

const Comments = mongoose.model('comments', commentsSchema);

module.exports = Comments;
