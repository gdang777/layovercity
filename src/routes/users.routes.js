const router = require('express').Router();
const {
    register,
    login,
    logout,
    authCheck,
    verifyOTP,
    sendOTP,
    updateUser,
    updateProfilePicture,
    getAllUsers,
    getUserById,
    updateUserStatus,
    blockUser,
} = require('../controllers/user.controller');

router.post('/register', register);

router.post('/login', login);

router.post('/otp/send', sendOTP);

router.post('/otp/verify', verifyOTP);

router.post('/upload-picture', updateProfilePicture);

router.get('/auth-check', authCheck);

router.get('/logout', logout);

router.put('/profile', updateUser);

router.get('/all-users', getAllUsers);

router.get('/getUserById/:userId', getUserById);

router.post('/update-status', updateUserStatus);

router.post('/block', blockUser);

module.exports = router;
