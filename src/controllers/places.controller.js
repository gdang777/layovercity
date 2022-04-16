const { getUserById } = require('../services/user.service');

const {
    addPlaces,
    getAllPlaces,
    getPlaceById,
    updatePlace,
    blockPlace,
} = require('../services/places.service');

const { getUserById: getAdminUserById } = require('../services/adminUsers.service');
const moment = require('moment');

exports.addPlace = async (req, res) => {
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
    const {
        images,
        features,
        price,
        city,
        country,
        category,
        subCategory,
        description,
        location,
        contact,
    } = req.body;
    if (!images || !city || !category || !country || !features || !contact) {
        return res.status(400).json({
            errorMsg: `Required fields are - images, city, category, country, features, contact`,
            isSuccess: false,
        });
    }

    addPlaces({ ...req.body, createdBy: accessToken })
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

exports.getAllPlaces = async (req, res) => {
    try {
        const { from = 0, size = 10 } = req.query;

        const result = await getAllPlaces(parseInt(from), parseInt(size));
        res.send(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error_msg: 'Internal server error',
            error_code: 50000,
        });
    }
};

exports.getPlaceById = async (req, res) => {
    try {
        const { placeId } = req.params;

        const userData = await getPlaceById(placeId);
        if (!userData) {
            return res.status(400).json({
                errorMsg: 'Invalid Id',
            });
        }
        const { ...filteredUserData } = userData;
        res.send({
            place: filteredUserData,
        });
    } catch (error) {
        console.error(error);
        const { message } = error;
        res.status(500).json({ errMsg: 'Internal Server errror', isError: true });
    }
};

exports.updatePlace = async (req, res) => {
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

        const { placeId, data } = req.body;

        const userData = await updatePlace({ placeId, data, accessToken });
        if (!userData) {
            return res.status(400).json({
                errorMsg: 'Invalid Id',
            });
        }
        const { ...filteredUserData } = userData;
        res.send({
            user: filteredUserData,
            isUpdated: true,
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({ errMsg: 'Internal Server errror', isUpdated: false });
    }
};

exports.blockPlace = async (req, res) => {
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

        const { placeId, value } = req.body;

        const userData = await blockPlace({ placeId, value, accessToken });
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
