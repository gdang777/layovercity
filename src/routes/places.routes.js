const router = require('express').Router();
const {
    addPlace,
    getAllPlaces,
    getPlaceById,
    blockPlace,
    updatePlace,
} = require('../controllers/places.controller');

router.post('/add', addPlace);

router.get('/', getAllPlaces);

router.get('/:placeId', getPlaceById);

router.post('/update', updatePlace);

router.post('/block', blockPlace);

module.exports = router;
