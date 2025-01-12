const { getPropertyById, addProperty } = require('../models/propertyModel');
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

exports.getPropertyById = (req, res) => {
    const propertyId = parseInt(req.params.id);
    const property = getPropertyById(propertyId);
    if (property) {
        res.json(property);
    } else {
        res.status(404).json({ message: 'Property not found' });
    }
};

exports.addProperty = (req, res) => {
    const newProperty = { id: uuidv4(), ...req.body };
    const addedProperty = addProperty(newProperty);

    const filePath = path.join(__dirname, '../data', 'registrosImoveis.json');

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
        registrosExistentes.push(addedProperty);

        // Save the updated data back to the file
        fs.writeFile(filePath, JSON.stringify(registrosExistentes, null, 2), (err) => {
            if (err) {
                return res.status(500).json({ message: 'Error saving client data' });
            }
            res.status(201).json(addedProperty);
        });
    });
};

// exports.addProperty = (req, res) => {
//     const newProperty = req.body;
//     const addedProperty = addProperty(newProperty);
//     res.status(201).json(addedProperty);
// };