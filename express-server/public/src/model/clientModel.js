const clients = [
    { id: 1, name: 'Client One', email: 'clientone@example.com' },
    { id: 2, name: 'Client Two', email: 'clienttwo@example.com' }
];

const getClientById = (id) => {
    return clients.find(client => client.id === id);
};

module.exports = { getClientById };