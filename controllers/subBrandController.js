const SubBrand = require('../models/index')['SubBrand'];

getAllSubBrands = async (req, res) => {
    try {
        console.log(SubBrand);
        const subBrands = await SubBrand.findAll();
        res.status(200).json(subBrands);
    } catch (e) {
        res.send('Error occurred ' + e);
    }
}

deleteAllSubBrands = async (req, res) => {
    try {
        const deletedSubBrands = await SubBrand.destroy({ truncate: true });
        res.send('Successfully deleted all the subBrands : ' + deletedSubBrands);
    } catch (e) {
        res.send('Error occurred ' + e);
    }
}

addSubBrand = async (req, res) => {
    try {
        const subBrand = await SubBrand.create({
            name: req.body.name,
            brand_id: req.body.brand_id
        }, { fields: ['name', 'brand_id'] });
        res.send('Successfully saved the subBrand : ' + subBrand);
    } catch (e) {
        res.send('Error occurred ' + e);
    }
}

getSubBrand = async (req, res) => {
    try {
        const subBrand = await SubBrand.findByPk(req.params.subBrandId);
        res.status(200).json(subBrand);
    } catch (e) {
        res.send('Error occurred ' + e);
    }
}

updateSubBrand = async (req, res) => {
    try {
        const updatedSubBrand = await SubBrand.update(req.body, { where: { id: req.params.subBrandId } });
        res.send('Successfully updated the subBrand : ' + updatedSubBrand);
    } catch (e) {
        res.send(e);
    }
}
// replaceSubBrand = async (req, res) => {
//     try {
//         const replacedSubBrand = await SubBrand.findOneAndReplace({ _id: req.params.subBrandId }, req.body, { new: true });
//         res.send('Successfully replaced the subBrand : ' + replacedSubBrand);
//     } catch (e) {
//         res.send(e);
//     }
// }

deleteSubBrand = async (req, res) => {
    try {
        const deletedSubBrand = await SubBrand.destroy({
            where: {
                id: req.params.subBrandId
            }
        });
        res.send('Successfully deleted the subBrand : ' + deletedSubBrand);
    } catch (e) {
        res.send(e);
    }
}

module.exports = {
    getAllSubBrands,
    addSubBrand,
    deleteAllSubBrands,
    getSubBrand,
    //replaceSubBrand,
    updateSubBrand,
    deleteSubBrand
};