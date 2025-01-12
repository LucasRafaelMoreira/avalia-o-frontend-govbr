const express = require('express');
const router = express.Router();
const propertyController = require('../controllers/propertyController');

// Define your routes here
router.get('/:id', propertyController.getPropertyById);
router.post('/', propertyController.addProperty);

module.exports = router;