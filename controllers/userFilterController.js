const UserFilters = require('../models/index')['UserFilters'];

getAllUserFilters = async (req, res) => {
    try {
        const filters = await UserFilters.findAll();
        res.status(200).json(filters);
    } catch (e) {
        res.send('Error occurred ' + e);
    }
}

deleteAllUserFilters = async (req, res) => {
    try {
        const deletedUserFilters = await UserFilters.destroy({ truncate: true });
        res.send('Successfully deleted all the filters : ' + deletedUserFilters);
    } catch (e) {
        res.send('Error occurred ' + e);
    }
}

addUserFilter = async (req, res) => {
    try {
        const filter = await UserFilters.create({
            name: req.body.name,
            user_id: req.body.user_id,
            category: req.body.category,
            sub_category: req.body.sub_category,
            brand: req.body.brand,
            sub_brand: req.body.sub_brand,
            channel: req.body.channel,
            retailer: req.body.retailer,
            size: req.body.size,
            sku: req.body.sku,
        }, { fields: ['name', 'user_id', 'category', 'sub_category', 'brand', 'sub_brand', 'channel', 'retailer', 'size', 'sku'] });
        res.send('Successfully saved the filter : ' + filter);
    } catch (e) {
        res.send('Error occurred ' + e);
    }
}

getUserFilter = async (req, res) => {
    try {
        const filter = await UserFilters.findByPk(req.params.filterId);
        res.status(200).json(filter);
    } catch (e) {
        res.send('Error occurred ' + e);
    }
}

updateUserFilter = async (req, res) => {
    try {
        const updatedUserFilter = await UserFilters.update(req.body, { where: { id: req.params.filterId } });
        res.send('Successfully updated the filter : ' + updatedUserFilter);
    } catch (e) {
        res.send(e);
    }
}
// replaceUserFilters = async (req, res) => {
//     try {
//         const replacedUserFilters = await UserFilters.findOneAndReplace({ _id: req.params.filterId }, req.body, { new: true });
//         res.send('Successfully replaced the filter : ' + replacedUserFilters);
//     } catch (e) {
//         res.send(e);
//     }
// }

deleteUserFilter = async (req, res) => {
    try {
        const deletedUserFilter = await UserFilters.destroy({
            where: {
                id: req.params.filterId
            }
        });
        res.send('Successfully deleted the filter : ' + deletedUserFilter);
    } catch (e) {
        res.send(e);
    }
}

module.exports = {
    getAllUserFilters,
    addUserFilter,
    deleteAllUserFilters,
    getUserFilter,
    //replaceUserFilters,
    updateUserFilter,
    deleteUserFilter
};