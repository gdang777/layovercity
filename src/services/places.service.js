const bcrypt = require('bcrypt');
const moment = require('moment');
const Places = require('../models/places.model');
const City = require('../models/city.model');
const sendMail = require('../utils/sendMail');

exports.addPlaces = async (data) => {
    const [user] = await Promise.all([
        Places.create({
            ...data,
        }),
    ]);

    const updatedCity = await City.findOneAndUpdate(
        { _id: data.city },
        {
            $inc: { places: 1 },
        },
        { new: true }
    )
        .lean()
        .exec();

    return user;
};

exports.getPlaceById = async (placeId) => {
    const place = await Places.findOne({ _id: placeId })
        .populate({
            path: 'createdBy',
        })
        .populate({
            path: 'city',
        })
        .lean()
        .exec();
    return place;
};

exports.getAllPlaces = async (from, size) => {
    const [result, totalCount] = await Promise.all([
        Places.find()
            .populate({
                path: 'createdBy',
            })
            .populate({
                path: 'city',
            })
            .skip(from)
            .limit(size)
            .lean()
            .exec(),
        Places.count().lean().exec(),
    ]);
    return { result, totalCount };
};

exports.blockPlace = async ({ placeId, value, accessToken }) => {
    const updatedPlace = await Places.findOneAndUpdate(
        { _id: placeId },
        {
            isBlocked: value,
        },
        { returnDocument: 'after' }
    )
        .lean()
        .exec();
    return updatedPlace;
};

exports.updatePlace = async ({ placeId, data, accessToken }) => {
    const place = await Places.findOne({ _id: placeId, createdBy: accessToken }).lean().exec();

    const updatedPlace = await Places.findOneAndUpdate(
        { _id: placeId, createdBy: accessToken },
        {
            ...place,
            ...data,
        },
        { returnDocument: 'after' }
    )
        .lean()
        .exec();
    console.log('place', place);
    return updatedPlace;
};
