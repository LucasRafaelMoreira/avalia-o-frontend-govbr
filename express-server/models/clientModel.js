const clients = [
];

const getClientById = (id) => {
    return clients.find(client => client.id === id);
};

const addClient = (client) => {
    const newClient = { id: clients.length + 1, ...client };
    clients.push(newClient);
    return newClient;
};

module.exports = { getClientById, addClient };