const router = require('express').Router();

router.use('/users', require('./users.routes'));
router.use('/admin', require('./adminuser.routes'));
router.use('/places', require('./places.routes'));
router.use('/likes', require('./likes.routes'));
router.use('/comments', require('./comments.routes'));
router.use('/stories', require('./stories.routes'));

module.exports = router;
