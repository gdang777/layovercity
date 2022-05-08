const { getUserById } = require('../services/user.service');

const {
    addCity,
    getAllCity,
    getCityById,
    updateCity,
    blockCity,
} = require('../services/city.service');

const { getUserById: getAdminUserById } = require('../services/adminUsers.service');
const moment = require('moment');

exports.addCity = async (req, res) => {
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
    const { images, country, city, caption, description, currency, language, bestTime } = req.body;
    if (
        !images ||
        !city ||
        !caption ||
        !country ||
        !description ||
        !currency ||
        !language ||
        !bestTime
    ) {
        return res.status(400).json({
            errorMsg: `Required fields are - images, city, caption, country, description, currency, language, bestTime`,
            isSuccess: false,
        });
    }

    addCity({ ...req.body, createdBy: accessToken })
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

exports.getAllCity = async (req, res) => {
    try {
        const { from = 0, size = 10000 } = req.query;

        const result = await getAllCity(parseInt(from), parseInt(size));
        res.send(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error_msg: 'Internal server error',
            error_code: 50000,
        });
    }
};

exports.getCityById = async (req, res) => {
    try {
        const { cityId } = req.params;

        const userData = await getCityById(cityId);
        if (!userData) {
            return res.status(400).json({
                errorMsg: 'Invalid Id',
            });
        }
        const { ...filteredUserData } = userData;
        res.send({
            city: filteredUserData,
        });
    } catch (error) {
        console.error(error);
        const { message } = error;
        res.status(500).json({ errMsg: 'Internal Server errror', isError: true });
    }
};

exports.updateCity = async (req, res) => {
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

        const { cityId, data } = req.body;

        const userData = await updateCity({ cityId, data, accessToken });
        if (!userData) {
            return res.status(400).json({
                errorMsg: 'Invalid Id',
            });
        }
        const { ...filteredUserData } = userData;
        res.send({
            city: filteredUserData,
            isUpdated: true,
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({ errMsg: 'Internal Server errror', isUpdated: false });
    }
};

exports.blockCity = async (req, res) => {
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

        const { cityId, value } = req.body;

        const userData = await blockCity({ cityId, value, accessToken });
        if (!userData) {
            return res.status(400).json({
                errorMsg: 'Invalid Id',
            });
        }
        const { ...filteredUserData } = userData;
        res.send({
            user: filteredUserData,
            isSuccess: true,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ errMsg: 'Internal Server errror', isError: false });
    }
};
