const express = require('express');
const router = express.Router();
const CarController = require('../Controllers/CarController');

router.get('/', CarController.getAllCars);
router.post('/', CarController.createCar);
router.get('/:id', CarController.getCarById);
router.put('/:id', CarController.updateCar);
router.delete('/:id', CarController.deleteCar);

module.exports = router;