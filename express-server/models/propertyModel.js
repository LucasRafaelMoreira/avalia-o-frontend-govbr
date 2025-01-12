const property = [   
];

const getPropertyById = (id) => {
    return property.find(client => client.id === id);
};

const addProperty = (client) => {
    const newProperty = { id: property.length + 1, ...client };
    property.push(newProperty);
    return newProperty;
};

module.exports = { getPropertyById, addProperty };