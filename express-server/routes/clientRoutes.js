const express = require('express');
const router = express.Router();
const clientsController = require('../controllers/clientsController');
const propertyController = require('../controllers/propertyController');

// Define your routes here
router.get('/:id', clientsController.getClientById);
router.post('/', clientsController.addClient);
router.post('/registroImovel', propertyController.addProperty);

module.exports = router;