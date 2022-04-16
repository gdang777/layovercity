const router = require('express').Router();
const {
    addStory,
    getAllStories,
    getStoryById,
    blockStory,
    updateStory,
} = require('../controllers/stories.controller');

router.post('/add', addStory);

router.get('/', getAllStories);

router.get('/:storyId', getStoryById);

router.post('/update', updateStory);

router.post('/block', blockStory);

module.exports = router;
