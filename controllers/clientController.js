const Client = require('../models/index')['Client'];

getAllClients = async (req, res) => {
    try {
        const clients = await Client.findAll();
        res.status(200).json(clients);
    } catch (e) {
        res.send('Error occurred ' + e);
    }
}

deleteAllClients = async (req, res) => {
    try {
        const deletedClients = await Client.destroy({ truncate: true });
        res.send('Successfully deleted all the clients : ' + deletedClients);
    } catch (e) {
        res.send('Error occurred ' + e);
    }
}

addClient = async (req, res) => {
    try {
        const client = await Client.create({
            name: req.body.name,
            image: req.body.image
        }, { fields: ['name', 'image'] });
        res.send('Successfully saved the client : ' + client);
    } catch (e) {
        res.send('Error occurred ' + e);
    }
}

getClient = async (req, res) => {
    try {
        const client = await Client.findByPk(req.params.clientId);
        res.status(200).json(client);
    } catch (e) {
        res.send('Error occurred ' + e);
    }
}

updateClient = async (req, res) => {
    try {
        const updatedClient = await Client.update(req.body, { where: { id: req.params.clientId } });
        res.send('Successfully updated the client : ' + updatedClient);
    } catch (e) {
        res.send(e);
    }
}
// replaceClient = async (req, res) => {
//     try {
//         const replacedClient = await Client.findOneAndReplace({ _id: req.params.clientId }, req.body, { new: true });
//         res.send('Successfully replaced the client : ' + replacedClient);
//     } catch (e) {
//         res.send(e);
//     }
// }

deleteClient = async (req, res) => {
    try {
        const deletedClient = await Client.destroy({
            where: {
                id: req.params.clientId
            }
        });
        res.send('Successfully deleted the client : ' + deletedClient);
    } catch (e) {
        res.send(e);
    }
}

module.exports = {
    getAllClients,
    addClient,
    deleteAllClients,
    getClient,
    //replaceClient,
    updateClient,
    deleteClient
};