const express = require('express');
const router = express.Router();
const propertyController = require('../controllers/propertyController');

router.get('/:id', propertyController.getPropertyById);
router.get('/', propertyController.getAllProperties);
router.post('/', propertyController.addProperty);
router.delete('/:id', propertyController.deleteProperty);


module.exports = router;