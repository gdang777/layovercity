const mongoose = require('mongoose');

const followersSchema = mongoose.Schema(
    {
        parentUser: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            index: true,
        },
        follower: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            index: true,
        },
        value: {
            type: Boolean,
            default: true,
        },
    },
    {
        timestamps: true,
    }
);

const Followers = mongoose.model('followers', followersSchema);

module.exports = Followers;
