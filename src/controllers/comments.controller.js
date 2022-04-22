const { getUserById } = require('../services/user.service');

const {
    addComments,
    getAllCommentsForPlaces,
    getAllCommentsForStories,
    addChildComment,
} = require('../services/comments.service');

const { getUserById: getAdminUserById } = require('../services/adminUsers.service');
const moment = require('moment');

exports.addComment = async (req, res) => {
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
    const { placeId, description, type } = req.body;
    if (!placeId || !description || !type) {
        return res.status(400).json({
            errorMsg: `Required fields are - placeId, description, type`,
            isSuccess: false,
        });
    }

    addComments({ ...req.body, createdBy: accessToken })
        .then(() => {
            res.send({ isSuccess: true });
        })
        .catch((err) => {
            console.log('err', err);

            const { message } = err;

            console.log('msg', message);

            res.status(message ? 400 : 500).json({
                errMsg: message ? message : 'Internal Server Error',
                isRegisterSuccess: false,
            });
        });
};

exports.addChildComment = async (req, res) => {
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
    const { placeId, description, type, parentCommentId } = req.body;

    if (!placeId || !description || !type || !parentCommentId) {
        return res.status(400).json({
            errorMsg: `Required fields are - placeId, description, type, parentCommentId`,
            isSuccess: false,
        });
    }

    addChildComment({ ...req.body, createdBy: accessToken })
        .then(() => {
            res.send({ isSuccess: true });
        })
        .catch((err) => {
            console.log('err', err);

            const { message } = err;

            console.log('msg', message);

            if (message === '(intermediate value) is not iterable') {
                res.status(200).json({
                    isSuccess: true,
                });
            } else {
                res.status(message ? 400 : 500).json({
                    errMsg: message ? message : 'Internal Server Error',
                    isRegisterSuccess: false,
                });
            }
        });
};

exports.getAllCommentsForPlaces = async (req, res) => {
    try {
        const { id } = req.query;
        const result = await getAllCommentsForPlaces(id);
        res.send(result);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error_msg: 'Internal server error',
            error_code: 50000,
        });
    }
};

exports.getAllCommentsForStories = async (req, res) => {
    try {
        const { id } = req.query;
        const result = await getAllCommentsForStories(id);
        res.send(result);
    } catch (error) {
        res.status(500).json({
            error_msg: 'Internal server error',
            error_code: 50000,
        });
    }
};
