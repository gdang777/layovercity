const { getUserById } = require('../services/user.service');

const {
    addStory,
    getAllStories,
    getStoryById,
    updateStory,
    blockStory,
} = require('../services/stories.service');

const { getUserById: getAdminUserById } = require('../services/adminUsers.service');
const moment = require('moment');

exports.addStory = async (req, res) => {
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
    const { images, title, city, country, category, description } = req.body;
    if (!images || !city || !category || !country || !title || !description) {
        return res.status(400).json({
            errorMsg: `Required fields are - images, city, category, country, title, description`,
            isSuccess: false,
        });
    }

    addStory({ ...req.body, createdBy: accessToken })
        .then(() => {
            res.send({ isRegisterSuccess: true });
        })
        .catch((err) => {
            console.error(err);

            res.status(500).json({
                errMsg: 'Internal Server errror',
                isRegisterSuccess: false,
            });
        });
};

exports.getAllStories = async (req, res) => {
    try {
        const { from = 0, size = 10 } = req.query;

        const result = await getAllStories(parseInt(from), parseInt(size));
        res.send(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error_msg: 'Internal server error',
            error_code: 50000,
        });
    }
};

exports.getStoryById = async (req, res) => {
    try {
        const { storyId } = req.params;

        const userData = await getStoryById(storyId);
        if (!userData) {
            return res.status(400).json({
                errorMsg: 'Invalid Id',
            });
        }
        const { ...filteredUserData } = userData;
        res.send({
            story: filteredUserData,
        });
    } catch (error) {
        console.error(error);
        const { message } = error;
        res.status(500).json({ errMsg: 'Internal Server errror', isError: true });
    }
};

exports.updateStory = async (req, res) => {
    try {
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

        const { storyId, data } = req.body;

        const userData = await updateStory({ storyId, data, accessToken });
        if (!userData) {
            return res.status(400).json({
                errorMsg: 'Invalid Id',
            });
        }
        const { ...filteredUserData } = userData;
        res.send({
            story: filteredUserData,
            isUpdated: true,
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({ errMsg: 'Internal Server errror', isUpdated: false });
    }
};

exports.blockStory = async (req, res) => {
    try {
        const accessToken = req.header('accesstoken') || '';
        if (!accessToken) {
            return res.status(400).json({
                errorMsg: 'Missing accessToken header',
            });
        }
        const user = await getAdminUserById(accessToken);
        if (!user) {
            return res.status(400).json({
                errorMsg: 'Invalid accessToken',
            });
        }

        const { storyId, value } = req.body;

        const userData = await blockStory({ storyId, value, accessToken });
        if (!userData) {
            return res.status(400).json({
                errorMsg: 'Invalid Id',
            });
        }
        const { ...filteredUserData } = userData;
        res.send({
            story: filteredUserData,
            isSuccess: true,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ errMsg: 'Internal Server errror', isError: false });
    }
};
