const UserProducts = require('../models/index')['UserProducts'];

getAllUserProducts = async (req, res) => {
    try {
        const userProducts = await UserProducts.findAll({
            attributes: ['user_id', 'product_id']
        });
        res.status(200).json(userProducts);
    } catch (e) {
        res.send('Error occurred ' + e);
    }
}

deleteAllUserProducts = async (req, res) => {
    try {
        const deletedUserProducts = await UserProducts.destroy({ truncate: true });
        res.send('Successfully deleted all the userProducts : ' + deletedUserProducts);
    } catch (e) {
        res.send('Error occurred ' + e);
    }
}

addUserProduct = async (req, res) => {
    try {
        const userProduct = await UserProducts.create({
            user_id: req.body.user_id,
            product_id: req.body.product_id
        }, { fields: ['user_id', 'product_id'] });
        res.send('Successfully saved the userProduct : ' + userProduct);
    } catch (e) {
        res.send('Error occurred ' + e);
    }
}

getUserProducts = async (req, res) => {
    try {
        const userProduct = await UserProducts.findAll({ where: { user_id: req.params.userId } });
        res.status(200).json(userProduct);
    } catch (e) {
        res.send('Error occurred ' + e);
    }
}

// updateUserProducts = async (req, res) => {
//     try {
//         const updatedUserProducts = await UserProducts.update(req.body, { where: { id: req.params.userId } });
//         res.send('Successfully updated the subCategory : ' + updatedUserProducts);
//     } catch (e) {
//         res.send(e);
//     }
// }
// replaceUserProducts = async (req, res) => {
//     try {
//         const replacedUserProducts = await UserProducts.findOneAndReplace({ _id: req.params.subCategoryId }, req.body, { new: true });
//         res.send('Successfully replaced the subCategory : ' + replacedUserProducts);
//     } catch (e) {
//         res.send(e);
//     }
// }

deleteUserProducts = async (req, res) => {
    try {
        const deletedUserProducts = await UserProducts.destroy({
            where: {
                user_id: req.params.userId
            }
        });
        res.send('Successfully deleted the user : ' + deletedUserProducts);
    } catch (e) {
        res.send(e);
    }
}

module.exports = {
    getAllUserProducts,
    deleteAllUserProducts,
    addUserProduct,
    getUserProducts,
    //replaceUserProducts,
    //updateUserProducts,
    deleteUserProducts
};