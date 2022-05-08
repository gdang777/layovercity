const mongoose = require('mongoose');
const User = require('./user.model');
const City = require('./city.model');

const placesSchema = mongoose.Schema(
    {
        images: [String],
        features: [String],
        likes: { type: Number, trim: true },
        comments: { type: Number, trim: true },
        price: {
            type: String,
            trim: true,
        },
        city: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            index: true,
            ref: City,
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

const Places = mongoose.model('places', placesSchema);

module.exports = Places;
