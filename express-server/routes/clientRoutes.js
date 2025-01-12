const express = require('express');
const router = express.Router();
const clientsController = require('../controllers/clientsController');

// Define your routes here
router.get('/:id', clientsController.getClientById);
router.post('/', clientsController.addClient);

module.exports = router;