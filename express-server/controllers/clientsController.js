const { getClientById, addClient } = require('../models/clientModel');
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const filePath = path.join(__dirname, '../data', 'registrosPessoas.json');

exports.getClientById = (req, res) => {
    const clientId = req.params.id;

    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
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
                return res.status(500).json({ message: 'Error parsing client data' });
            }
        }

        const client = registrosExistentes.find(c => c.id === clientId);
        if (client) {
            res.json(client);
        } else {
            res.status(404).json({ message: 'Client not found' });
        }
    });
};

exports.addClient = (req, res) => {
    const newClient = { id: uuidv4(), ...req.body };
    const addedClient = addClient(newClient);

    const filePath = path.join(__dirname, '../data', 'registrosPessoas.json');

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

        registrosExistentes.push(addedClient);

        fs.writeFile(filePath, JSON.stringify(registrosExistentes, null, 2), (err) => {
            if (err) {
                return res.status(500).json({ message: 'Error saving client data' });
            }
            res.status(201).json(addedClient);
        });
    });
};

exports.deleteClient = (req, res) => {
    const clientId = req.params.id;

    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ message: 'Error reading client data' });
        }

        let properties = [];
        if (data) {
            try {
                properties = JSON.parse(data);
                if (!Array.isArray(properties)) {
                    properties = [];
                }
            } catch (e) {
                return res.status(500).json({ message: 'Error parsing client data' });
            }
        }

        const updatedProperties = properties.filter(p => p.id !== clientId);

        fs.writeFile(filePath, JSON.stringify(updatedProperties, null, 2), (err) => {
            if (err) {
                return res.status(500).json({ message: 'Error saving client data' });
            }
            res.status(200).json({ message: 'Client deleted successfully' });
        });
    });
};
