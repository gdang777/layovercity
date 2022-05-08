const bcrypt = require('bcrypt');
const moment = require('moment');
const City = require('../models/city.model');

exports.addCity = async (data) => {
    const [user] = await Promise.all([
        City.create({
            ...data,
        }),
    ]);

    return user;
};

exports.getCityById = async (cityId) => {
    const place = await City.findOne({ _id: cityId })
        .populate({
            path: 'createdBy',
            select: 'firstName lastName email airline profileAirlinePicture',
        })
        .lean()
        .exec();
    return place;
};

exports.getAllCity = async (from, size) => {
    const [result, totalCount] = await Promise.all([
        City.find()
            .populate({
                path: 'createdBy',
                select: 'firstName lastName email airline profileAirlinePicture',
            })
            .skip(from)
            .limit(size)
            .lean()
            .exec(),
        City.count().lean().exec(),
    ]);
    return { result, totalCount };
};

exports.blockCity = async ({ cityId, value, accessToken }) => {
    const updatedPlace = await City.findOneAndUpdate(
        { _id: cityId },
        {
            isBlocked: value,
        },
        { returnDocument: 'after' }
    )
        .lean()
        .exec();
    return updatedPlace;
};

exports.updateCity = async ({ cityId, data, accessToken }) => {
    const place = await City.findOne({ _id: cityId, createdBy: accessToken }).lean().exec();

    const updatedPlace = await City.findOneAndUpdate(
        { _id: cityId, createdBy: accessToken },
        {
            ...place,
            ...data,
        },
        { returnDocument: 'after' }
    )
        .lean()
        .exec();

    return updatedPlace;
};
