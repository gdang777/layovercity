const {
    createUser,
    getUserById,
    validateUser,
    updateUser: updateUserService,
    getAllUsers,
} = require('../services/adminUsers.service');
const moment = require('moment');

exports.register = (req, res) => {
    const { firstName, lastName, email, airline, password } = req.body;
    if (!email || !password || !firstName || !lastName) {
        let field = '';
        if (!email) {
            field = 'email';
        }
        if (!password) {
            field = 'password';
        }
        if (!lastName) {
            field = 'lastName';
        }
        if (!firstName) {
            field = 'firstName';
        }

        return res.status(400).json({
            errorMsg: `${field} field is required`,
            isRegisterSuccess: false,
        });
    }

    createUser(firstName, lastName, email, password)
        .then(() => {
            res.send({ isRegisterSuccess: true });
        })
        .catch((err) => {
            console.error(err);
            if (err.message === 'email_already_taken') {
                res.status(400).json({
                    errMsg: 'Given Mail is already Taken by another user',
                    isRegisterSuccess: false,
                });
            } else {
                res.status(500).json({
                    errMsg: 'Internal Server errror',
                    isRegisterSuccess: false,
                });
            }
        });
};

exports.login = (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({
            errorMsg: 'Required fields - email, password',
            isLoginSuccess: false,
        });
    }

    validateUser(email, password)
        .then(
            ({
                isPasswordMatch,
                user: {
                    _id: accessToken,
                    password,
                    verification: { email: { isVerified } = {}, isAdminVerified } = {},
                    ...filteredUser
                } = {},
            } = {}) => {
                console.log('admin', isAdminVerified);
                if (!isPasswordMatch) {
                    throw new Error('login_failed');
                }
                res.send({ isLoginSuccess: true, user: filteredUser, accessToken });
            }
        )
        .catch((err) => {
            console.error(err);
            if (err.message === 'login_failed') {
                res.status(400).json({
                    isLoginSuccess: false,
                    errCode: 40001,
                    errMsg: 'Invalid email or password',
                });
            } else {
                res.status(500).json({ errMsg: 'Internal Server errror' });
            }
        });
};

exports.logout = async (_req, res) => {
    res.send({
        isLogoutSuccess: true,
    });
};

exports.authCheck = async (req, res) => {
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
                isAuthenticated: false,
            });
        }
        const { password, verification, _id, __v, ...filteredUserData } = user;
        res.send({
            isAuthenticated: true,
            user: filteredUserData,
        });
    } catch (error) {
        console.error(error);
        const { message } = error;
        res.status(500).json({ errMsg: 'Internal Server errror', isAuthenticated: false });
    }
};

exports.updateUser = async (req, res) => {
    try {
        const accessToken = req.header('accesstoken') || '';
        if (!accessToken) {
            return res.status(400).json({
                errorMsg: 'Missing accessToken header',
            });
        }
        const { name, profileAirlinePicture } = req.body;
        if (!subUsers && !password && !name) {
            return res.status(400).json({
                errorMsg: 'Either one of the fields - subUsers, password, name required',
                isUpdated: false,
            });
        }
        const user = await updateUserService({ name, password, subUsers, userId: accessToken });
        if (!user) {
            return res.status(400).json({
                errorMsg: 'Invalid accessToken',
                isUpdated: false,
            });
        }
        const { password: passFromDB, verification, _id, __v, ...filteredUserData } = user;
        res.send({
            isUpdated: true,
            user: filteredUserData,
        });
    } catch (error) {
        console.error(error);
        const { message } = error;
        res.status(500).json({ errMsg: 'Internal Server errror', isUpdated: false });
    }
};

exports.getAllUsers = async (req, res) => {
    try {
        const accessToken = req.header('accesstoken') || '';
        const { from = 0, size = 10 } = req.query;
        if (!accessToken) {
            return res.status(400).json({
                errorMsg: 'Missing accessToken header',
            });
        }
        const userData = await getUserById(accessToken);
        if (!userData) {
            throw new Error('INVALID_AT');
        }
        const result = await getAllUsers(parseInt(from), parseInt(size));
        res.send(result);
    } catch (error) {
        console.error(error);
        const { message } = error;
        switch (message) {
            case 'INVALID_AT': {
                res.status(400).json({
                    error_msg: 'Invalid accessToken',
                    error_code: 40013,
                });
                break;
            }
            default:
                res.status(500).json({
                    error_msg: 'Internal server error',
                    error_code: 50000,
                });
                break;
        }
    }
};

exports.getUserById = async (req, res) => {
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

        const { userId } = req.params;

        const userData = await getUserById(userId);
        if (!userData) {
            return res.status(400).json({
                errorMsg: 'Invalid Id',
            });
        }
        const { password, verification, _id, __v, ...filteredUserData } = userData;
        res.send({
            user: filteredUserData,
        });
    } catch (error) {
        console.error(error);
        const { message } = error;
        res.status(500).json({ errMsg: 'Internal Server errror', isAuthenticated: false });
    }
};
