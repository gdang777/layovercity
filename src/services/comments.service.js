const Comments = require('../models/comments.model');
const { getAllUsers } = require('./user.service');

exports.addComments = async (data) => {
    const [user] = await Promise.all([
        Comments.create({
            ...data,
        }),
    ]);

    return user;
};

exports.addChildComment = async (data) => {
    const comment = await Comments.findOne({
        _id: data.parentCommentId,
        placeId: data.placeId,
        type: data.type,
    })
        .lean()
        .exec();
    if (!comment) {
        throw new Error('Parent Comment Not Found');
    }

    if (comment.children.length < 2) {
        const [user] = await Comments.findOneAndUpdate(
            { _id: data.parentCommentId, placeId: data.placeId, type: data.type },
            {
                $push: {
                    children: data,
                },
            },
            { returnDocument: 'after' }
        )
            .lean()
            .exec();

        return user;
    } else {
        throw new Error('Only 2 Child Comment Allowed');
    }
};

const formatChildrenData = async (children, users) => {
    let childrenData = [];
    for (let j = 0; j < children.length; j++) {
        const userData = users.result.find(
            (ele) => ele._id.toString() === children[j].createdBy.toString()
        );
        childrenData.push({
            ...children[j],
            user: {
                _id: userData._id,
                firstName: userData.firstName,
                lastName: userData.lastName,
                email: userData.email,
                airline: userData.airline,
                profileAirlinePicture: userData.profileAirlinePicture,
            },
        });
    }

    return childrenData;
};

exports.getAllCommentsForPlaces = async (id) => {
    const [result, totalCount] = await Promise.all([
        Comments.find({ placeId: id, type: 'place' }).lean().exec(),
        Comments.find({ placeId: id, type: 'place' }).count().lean().exec(),
    ]);

    let resultData = [];

    const users = await getAllUsers(0, 100000000);

    for (let i = 0; i < result.length; i++) {
        const childrenData = await formatChildrenData(result[i].children, users);

        const user = users.result.find(
            (ele) => ele._id.toString() === result[i].createdBy.toString()
        );

        resultData.push({
            ...result[i],
            children: [...childrenData],
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

    const users = await getAllUsers(0, 100000000);

    for (let i = 0; i < result.length; i++) {
        const childrenData = await formatChildrenData(result[i].children, users);

        const user = users.result.find(
            (ele) => ele._id.toString() === result[i].createdBy.toString()
        );

        resultData.push({
            ...result[i],
            children: [...childrenData],
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
