const mongoose = require('mongoose');

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
        },
    },
    {
        timestamps: true,
    }
);

const Comments = mongoose.model('comments', commentsSchema);

module.exports = Comments;
