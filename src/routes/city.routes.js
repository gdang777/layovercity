const router = require('express').Router();
const {
    addCity,
    getAllCity,
    getCityById,
    blockCity,
    updateCity,
} = require('../controllers/city.controller');

router.post('/add', addCity);

router.get('/', getAllCity);

router.get('/:cityId', getCityById);

router.post('/update', updateCity);

router.post('/block', blockCity);

module.exports = router;
