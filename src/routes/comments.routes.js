const router = require('express').Router();
const {
    addComment,
    getAllCommentsForPlaces,
    getAllCommentsForStories,
    addChildComment,
} = require('../controllers/comments.controller');

router.post('/', addComment);

router.post('/child', addChildComment);

router.get('/places', getAllCommentsForPlaces);

router.get('/stories', getAllCommentsForStories);

module.exports = router;
