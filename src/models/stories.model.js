const mongoose = require('mongoose');

const storiesSchema = mongoose.Schema(
    {
        images: [String],
        title: {
            type: String,
            required: true,
            trim: true,
        },
        city: {
            type: String,
            required: true,
            trim: true,
        },
        country: {
            type: String,
            required: true,
            trim: true,
        },
        category: {
            type: String,
            required: true,
            trim: true,
        },
        subCategory: {
            type: String,
            required: true,
            trim: true,
        },
        description: {
            type: String,
            required: true,
            trim: true,
        },
        location: {
            lat: {
                type: String,
                trim: true,
            },
            long: {
                type: String,
                trim: true,
            },
        },
        contact: {
            address: {
                type: String,
                trim: true,
            },
            phone: {
                type: String,
                trim: true,
            },
            email: {
                type: String,
                trim: true,
            },
            facebook: {
                type: String,
                trim: true,
            },
            instagram: {
                type: String,
                trim: true,
            },
            website: {
                type: String,
                trim: true,
            },
        },
        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            index: true,
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

const Stories = mongoose.model('stories', storiesSchema);

module.exports = Stories;
