const { getUserById } = require('../services/user.service');

const {
    addFollower,
    removeFollower,
    getAllFollowersByUserId,
} = require('../services/follower.service');

const { getUserById: getAdminUserById } = require('../services/adminUsers.service');
const moment = require('moment');

exports.addFollower = async (req, res) => {
    const accessToken = req.header('accesstoken') || '';
    if (!accessToken) {
        return res.status(400).json({
            errorMsg: 'Missing accessToken header',
        });
    }
    const user = await getUserById(accessToken);
    if (!user) {
        return res.status(400).json({
            errorMsg: 'Invalid accessToken',
        });
    }
    const { followerId } = req.body;
    if (!followerId) {
        return res.status(400).json({
            errorMsg: `Required fields are - followerId`,
            isSuccess: false,
        });
    }

    addFollower({ follower: followerId, parentUser: accessToken })
        .then(() => {
            res.send({ isFollowed: true });
        })
        .catch((err) => {
            console.error(err);

            res.status(500).json({
                errMsg: 'Internal Server errror',
                isRegisterSuccess: false,
            });
        });
};

exports.removeFollower = async (req, res) => {
    const accessToken = req.header('accesstoken') || '';
    if (!accessToken) {
        return res.status(400).json({
            errorMsg: 'Missing accessToken header',
        });
    }
    const user = await getUserById(accessToken);
    if (!user) {
        return res.status(400).json({
            errorMsg: 'Invalid accessToken',
        });
    }
    const { followerId } = req.body;
    if (!followerId) {
        return res.status(400).json({
            errorMsg: `Required fields are - followerId`,
            isSuccess: false,
        });
    }

    removeFollower({ follower: followerId, parentUser: accessToken })
        .then(() => {
            res.send({ isUnFollowed: true });
        })
        .catch((err) => {
            console.error(err);

            res.status(500).json({
                errMsg: 'Internal Server errror',
                isRegisterSuccess: false,
            });
        });
};

exports.getAllFollowersById = async (req, res) => {
    try {
        const { userId } = req.params;

        const result = await getAllFollowersByUserId(userId);
        res.send(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error_msg: 'Internal server error',
            error_code: 50000,
        });
    }
};
