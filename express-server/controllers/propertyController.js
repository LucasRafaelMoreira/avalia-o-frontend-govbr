const { getPropertyById, addProperty } = require('../models/propertyModel');
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const filePath = path.join(__dirname, '../data', 'registrosImoveis.json');

exports.getPropertyById = (req, res) => {
    const propertyId = req.params.id;

    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ message: 'Error reading property data' });
        }

        let properties = [];
        if (data) {
            try {
                properties = JSON.parse(data);
                if (!Array.isArray(properties)) {
                    properties = [];
                }
            } catch (e) {
                return res.status(500).json({ message: 'Error parsing property data' });
            }
        }

        const property = properties.find(p => p.id === propertyId);
        if (property) {
            res.json(property);
        } else {
            res.status(404).json({ message: 'Property not found' });
        }
    });
};

exports.addProperty = (req, res) => {
    const newProperty = { id: uuidv4(), ...req.body };
    const addedProperty = addProperty(newProperty);

    const filePath = path.join(__dirname, '../data', 'registrosImoveis.json');

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

        registrosExistentes.push(addedProperty);

        fs.writeFile(filePath, JSON.stringify(registrosExistentes, null, 2), (err) => {
            if (err) {
                return res.status(500).json({ message: 'Error saving client data' });
            }
            res.status(201).json(addedProperty);
        });
    });
};

exports.deleteProperty = (req, res) => {
    const propertyId = req.params.id;

    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ message: 'Error reading property data' });
        }

        let properties = [];
        if (data) {
            try {
                properties = JSON.parse(data);
                if (!Array.isArray(properties)) {
                    properties = [];
                }
            } catch (e) {
                return res.status(500).json({ message: 'Error parsing property data' });
            }
        }

        const updatedProperties = properties.filter(p => p.id !== propertyId);

        fs.writeFile(filePath, JSON.stringify(updatedProperties, null, 2), (err) => {
            if (err) {
                return res.status(500).json({ message: 'Error saving property data' });
            }
            res.status(200).json({ message: 'Property deleted successfully' });
        });
    });
};