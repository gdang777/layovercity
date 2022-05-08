const mongoose = require('mongoose');
const User = require('./user.model');

const followersSchema = mongoose.Schema(
    {
        parentUser: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            index: true,
            ref: User,
        },
        follower: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            index: true,
            ref: User,
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
