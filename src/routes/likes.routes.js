const router = require('express').Router();
const {
    addLike,
    getAllLikesForPlaces,
    getAllLikesForStories,
} = require('../controllers/likes.controller');

router.post('/', addLike);

router.get('/places', getAllLikesForPlaces);

router.get('/stories', getAllLikesForStories);

module.exports = router;
