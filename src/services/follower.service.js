const Followers = require('../models/followers.model');
const User = require('../models/user.model');

exports.addFollower = async (data) => {
    const { parentUser } = data;

    const [followerData] = await Promise.all([
        Followers.update({ parentUser: parentUser }, { ...data, value: true }, { upsert: true }),
    ]);

    const updatedUser = await User.findOneAndUpdate(
        { _id: parentUser },
        {
            $inc: { followers: 1 },
        },
        { new: true }
    )
        .lean()
        .exec();

    return followerData;
};

exports.removeFollower = async (data) => {
    const { follower, parentUser } = data;
    const updatedFollower = await Followers.findOneAndUpdate(
        { parentUser: parentUser, follower: follower, value: true },
        {
            value: false,
        },
        { returnDocument: 'after' }
    )
        .lean()
        .exec();

    const updatedUser = await User.findOneAndUpdate(
        { _id: parentUser },
        {
            $inc: { followers: -1 },
        },
        { new: true }
    )
        .lean()
        .exec();

    return updatedFollower;
};

exports.getAllFollowersByUserId = async (id) => {
    const [result, totalCount] = await Promise.all([
        Followers.find({ parentUser: id, value: true })
            .populate({
                path: 'follower',
                select: 'firstName lastName email airline profileAirlinePicture',
            })
            .lean()
            .exec(),
        Followers.find({ parentUser: id, value: true }).count().lean().exec(),
    ]);

    return { result, totalCount };
};
