const properties = [   
];

const getPropertyById = (id) => {
    return properties.find(property => property.id === id);
};

const addProperty = (property) => {
    const newProperty = { id: property.length + 1, ...property };
    properties.push(newProperty);
    return newProperty;
};

module.exports = { getPropertyById, addProperty };