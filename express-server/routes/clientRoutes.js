const express = require('express');
const router = express.Router();
const clientsController = require('../controllers/clientsController');

router.get('/:id', clientsController.getClientById);
router.post('/', clientsController.addClient);
router.delete('/:id', clientsController.deleteClient);

module.exports = router;