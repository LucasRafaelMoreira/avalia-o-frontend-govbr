const express = require('express');
const router = express.Router();
const clientsController = require('../controllers/clientsController');

router.get('/', clientsController.getAllClients);
router.post('/', clientsController.addClient);
router.delete('/:id', clientsController.deleteClient);

module.exports = router;