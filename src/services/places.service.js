const bcrypt = require('bcrypt');
const moment = require('moment');
const Places = require('../models/places.model');
const sendMail = require('../utils/sendMail');

exports.addPlaces = async (data) => {
    const [user] = await Promise.all([
        Places.create({
            ...data,
        }),
    ]);

    return user;
};

exports.getPlaceById = async (placeId) => {
    const place = await Places.findOne({ _id: placeId }).lean().exec();
    return place;
};

exports.getAllPlaces = async (from, size) => {
    const [result, totalCount] = await Promise.all([
        Places.find().skip(from).limit(size).lean().exec(),
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
    console.log('data', data, accessToken);
    const place = await Places.findOne({ _id: placeId, createdBy: accessToken }).lean().exec();
    console.log('place', place);
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
