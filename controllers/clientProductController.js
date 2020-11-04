const ClientProducts = require('../models/index')['ClientProducts'];

getAllClientProducts = async (req, res) => {
    try {
        const clientProducts = await ClientProducts.findAll({
            attributes: ['client_id', 'category_id', 'product_id']
        });
        res.status(200).json(clientProducts);
    } catch (e) {
        res.send('Error occurred ' + e);
    }
}

deleteAllClientProducts = async (req, res) => {
    try {
        const deletedClientProducts = await ClientProducts.destroy({ truncate: true });
        res.send('Successfully deleted all the clientProducts : ' + deletedClientProducts);
    } catch (e) {
        res.send('Error occurred ' + e);
    }
}

addClientProduct = async (req, res) => {
    try {
        const clientProduct = await ClientProducts.create({
            client_id: req.body.client_id,
            category_id: req.body.category_id,
            product_id: req.body.product_id
        }, { fields: ['client_id', 'category_id', 'product_id'] });
        res.send('Successfully saved the clientProduct : ' + clientProduct);
    } catch (e) {
        res.send('Error occurred ' + e);
    }
}

getClientProducts = async (req, res) => {
    try {
        const clientProduct = await ClientProducts.findAll({ where: { client_id: req.params.clientId } });
        res.status(200).json(clientProduct);
    } catch (e) {
        res.send('Error occurred ' + e);
    }
}

// updateClientProducts = async (req, res) => {
//     try {
//         const updatedClientProducts = await ClientProducts.update(req.body, { where: { id: req.params.clientId } });
//         res.send('Successfully updated the subCategory : ' + updatedClientProducts);
//     } catch (e) {
//         res.send(e);
//     }
// }
// replaceClientProducts = async (req, res) => {
//     try {
//         const replacedClientProducts = await ClientProducts.findOneAndReplace({ _id: req.params.subCategoryId }, req.body, { new: true });
//         res.send('Successfully replaced the subCategory : ' + replacedClientProducts);
//     } catch (e) {
//         res.send(e);
//     }
// }

deleteClientProducts = async (req, res) => {
    try {
        const deletedClientProducts = await ClientProducts.destroy({
            where: {
                client_id: req.params.clientId
            }
        });
        res.send('Successfully deleted the client : ' + deletedClientProducts);
    } catch (e) {
        res.send(e);
    }
}

module.exports = {
    getAllClientProducts,
    deleteAllClientProducts,
    addClientProduct,
    getClientProducts,
    //replaceClientProducts,
    //updateClientProducts,
    deleteClientProducts
};