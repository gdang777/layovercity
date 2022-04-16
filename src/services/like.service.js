const Likes = require('../models/like.model');
const { getUserById } = require('./user.service');

exports.addLike = async (data) => {
    const [user] = await Promise.all([
        Likes.create({
            ...data,
        }),
    ]);

    return user;
};

exports.getAllLikesForPlaces = async (id) => {
    const [result, totalCount] = await Promise.all([
        Likes.find({ placeId: id, type: 'place' }).lean().exec(),
        Likes.find({ placeId: id, type: 'place' }).count().lean().exec(),
    ]);

    let resultData = [];

    for (let i = 0; i < result.length; i++) {
        const user = await getUserById(result[i].createdBy.toString());
        resultData.push({
            ...result[i],
            user: {
                _id: user._id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                airline: user.airline,
                profileAirlinePicture: user.profileAirlinePicture,
            },
        });
    }

    return { resultData, totalCount };
};

exports.getAllLikesForStories = async (id) => {
    const [result, totalCount] = await Promise.all([
        Likes.find({ placeId: id, type: 'story' }).lean().exec(),
        Likes.find({ placeId: id, type: 'story' }).count().lean().exec(),
    ]);

    let resultData = [];

    for (let i = 0; i < result.length; i++) {
        const user = await getUserById(result[i].createdBy.toString());
        console.log(user);
        resultData.push({
            ...result[i],
            user: {
                _id: user._id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                airline: user.airline,
                profileAirlinePicture: user.profileAirlinePicture,
            },
        });
    }

    return { resultData, totalCount };
};
