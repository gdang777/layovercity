const mongoose = require('mongoose');
const User = require('./user.model');

const citySchema = mongoose.Schema(
    {
        images: [String],
        country: {
            type: String,
            required: true,
            trim: true,
        },
        city: {
            type: String,
            required: true,
            trim: true,
        },
        caption: {
            type: String,
            required: true,
            trim: true,
        },
        description: {
            type: String,
            required: true,
            trim: true,
        },
        currency: {
            type: String,
            required: true,
            trim: true,
        },
        language: {
            type: String,
            required: true,
            trim: true,
        },
        bestTime: {
            type: String,
            required: true,
            trim: true,
        },
        places: { type: Number, trim: true },
        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            index: true,
            ref: User,
        },
        isBlocked: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
    }
);

const City = mongoose.model('city', citySchema);

module.exports = City;
