const router = require('express').Router();
const {
    addFollower,
    removeFollower,
    getAllFollowersById,
} = require('../controllers/follower.controller');

router.post('/add', addFollower);

router.post('/remove', removeFollower);

router.get('/:userId', getAllFollowersById);

module.exports = router;
