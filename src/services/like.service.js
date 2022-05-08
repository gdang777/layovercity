const Likes = require('../models/like.model');
const Places = require('../models/places.model');

exports.addLike = async (data) => {
    const [followerData] = await Promise.all([
        Likes.update({ placeId: data.placeId, type: data.type }, { ...data }, { upsert: true }),
    ]);

    const updatedUser = await Places.findOneAndUpdate(
        { _id: data.placeId },
        {
            $inc: { likes: data.like ? 1 : -1 },
        },
        { new: true }
    )
        .lean()
        .exec();

    return followerData;
};

exports.getAllLikesForPlaces = async (id) => {
    const [result, totalCount] = await Promise.all([
        Likes.find({ placeId: id, type: 'place', like: true })
            .populate({
                path: 'createdBy',
            })
            .lean()
            .exec(),
        Likes.find({ placeId: id, type: 'place', like: true }).count().lean().exec(),
    ]);

    return { result, totalCount };
};

exports.getAllLikesForStories = async (id) => {
    const [result, totalCount] = await Promise.all([
        Likes.find({ placeId: id, type: 'story', like: true })
            .populate({
                path: 'createdBy',
            })
            .lean()
            .exec(),
        Likes.find({ placeId: id, type: 'story', like: true }).count().lean().exec(),
    ]);

    return { result, totalCount };
};
