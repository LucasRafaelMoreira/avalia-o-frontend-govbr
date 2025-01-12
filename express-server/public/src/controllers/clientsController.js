const { getClientById } = require('../models/clientModel');

exports.getClientById = (req, res) => {
    const clientId = parseInt(req.params.id);
    const client = getClientById(clientId);
    if (client) {
        res.json(client);
    } else {
        res.status(404).json({ message: 'Client not found' });
    }
};