const { getClientById, addClient } = require('../models/clientModel');
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

exports.getClientById = (req, res) => {
    const clientId = parseInt(req.params.id);
    const client = getClientById(clientId);
    if (client) {
        res.json(client);
    } else {
        res.status(404).json({ message: 'Client not found' });
    }
};

exports.addClient = (req, res) => {
    const newClient = { id: uuidv4(), ...req.body };
    const addedClient = addClient(newClient);

    const filePath = path.join(__dirname, '../data', 'registrosPessoas.json');

    // Read the existing data from the file
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err && err.code !== 'ENOENT') {
            return res.status(500).json({ message: 'Error reading client data' });
        }

        let registrosExistentes = [];
        if (data) {
            try {
                registrosExistentes = JSON.parse(data);
                if (!Array.isArray(registrosExistentes)) {
                    registrosExistentes = [];
                }
            } catch (e) {
                registrosExistentes = [];
            }
        }

        // Add the new client to the existing data
        registrosExistentes.push(addedClient);

        // Save the updated data back to the file
        fs.writeFile(filePath, JSON.stringify(registrosExistentes, null, 2), (err) => {
            if (err) {
                return res.status(500).json({ message: 'Error saving client data' });
            }
            res.status(201).json(addedClient);
        });
    });
};
