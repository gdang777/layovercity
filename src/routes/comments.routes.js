const router = require('express').Router();
const {
    addComment,
    getAllCommentsForPlaces,
    getAllCommentsForStories,
} = require('../controllers/comments.controller');

router.post('/', addComment);

router.get('/places', getAllCommentsForPlaces);

router.get('/stories', getAllCommentsForStories);

module.exports = router;
