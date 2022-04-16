const Comments = require('../models/comments.model');
const { getUserById } = require('./user.service');

exports.addComments = async (data) => {
    const [user] = await Promise.all([
        Comments.create({
            ...data,
        }),
    ]);

    return user;
};

exports.getAllCommentsForPlaces = async (id) => {
    const [result, totalCount] = await Promise.all([
        Comments.find({ placeId: id, type: 'place' }).lean().exec(),
        Comments.find({ placeId: id, type: 'place' }).count().lean().exec(),
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

exports.getAllCommentsForStories = async (id) => {
    const [result, totalCount] = await Promise.all([
        Comments.find({ placeId: id, type: 'story' }).lean().exec(),
        Comments.find({ placeId: id, type: 'story' }).count().lean().exec(),
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
