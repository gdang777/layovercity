const Comments = require('../models/comments.model');
const Places = require('../models/places.model');

exports.addComments = async (data) => {
    const [user] = await Promise.all([
        Comments.create({
            ...data,
        }),
    ]);

    const updatedUser = await Places.findOneAndUpdate(
        { _id: data.placeId },
        {
            $inc: { comments: 1 },
        },
        { new: true }
    )
        .lean()
        .exec();

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

        const updatedUser = await Places.findOneAndUpdate(
            { _id: data.placeId },
            {
                $inc: { comments: 1 },
            },
            { new: true }
        )
            .lean()
            .exec();

        return user;
    } else {
        throw new Error('Only 2 Child Comment Allowed');
    }
};

exports.getAllCommentsForPlaces = async (id) => {
    const [result, totalCount] = await Promise.all([
        Comments.find({ placeId: id, type: 'place' })
            .populate({
                path: 'createdBy',
            })
            .populate({
                path: 'children.createdBy',
            })
            .lean()
            .exec(),
        Comments.find({ placeId: id, type: 'place' }).count().lean().exec(),
    ]);

    return { result, totalCount };
};

exports.getAllCommentsForStories = async (id) => {
    const [result, totalCount] = await Promise.all([
        Comments.find({ placeId: id, type: 'story' })
            .populate({
                path: 'createdBy',
            })
            .populate({
                path: 'children.createdBy',
            })
            .lean()
            .exec(),
        Comments.find({ placeId: id, type: 'story' }).count().lean().exec(),
    ]);

    return { result, totalCount };
};
