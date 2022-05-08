const { getUserById } = require('../services/user.service');

const {
    addLike,
    getAllLikesForPlaces,
    getAllLikesForStories,
} = require('../services/like.service');

const { getUserById: getAdminUserById } = require('../services/adminUsers.service');
const moment = require('moment');

exports.addLike = async (req, res) => {
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
    const { placeId, like, type } = req.body;
    if (!placeId || like === undefined || !type) {
        return res.status(400).json({
            errorMsg: `Required fields are - placeId, like, type`,
            isSuccess: false,
        });
    }

    addLike({ ...req.body, createdBy: accessToken })
        .then(() => {
            res.send({ isSuccess: true });
        })
        .catch((err) => {
            console.error(err);

            res.status(500).json({
                errMsg: 'Internal Server errror',
                isRegisterSuccess: false,
            });
        });
};

exports.getAllLikesForPlaces = async (req, res) => {
    try {
        const { id } = req.query;
        const result = await getAllLikesForPlaces(id);
        res.send(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error_msg: 'Internal server error',
            error_code: 50000,
        });
    }
};

exports.getAllLikesForStories = async (req, res) => {
    try {
        const { id } = req.query;
        const result = await getAllLikesForStories(id);
        res.send(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error_msg: 'Internal server error',
            error_code: 50000,
        });
    }
};
