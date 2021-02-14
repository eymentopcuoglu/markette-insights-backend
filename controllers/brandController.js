const Brand = require('../models/index')['Brand'];

getAllBrands = async (req, res) => {
    try {
        console.log(Brand);
        const brands = await Brand.findAll();
        res.status(200).json(brands);
    } catch (e) {
        res.send('Error occurred ' + e);
    }
}

deleteAllBrands = async (req, res) => {
    try {
        const deletedBrands = await Brand.destroy({ truncate: true });
        res.send('Successfully deleted all the brands : ' + deletedBrands);
    } catch (e) {
        res.send('Error occurred ' + e);
    }
}

addBrand = async (req, res) => {
    try {
        const brand = await Brand.create({
            name: req.body.name,
            supplier_id: req.body.supplier_id,
            parent_brand_id: req.body.parent_brand_id
        }, { fields: ['name', 'supplier_id', 'parent_brand_id'] });
        res.send('Successfully saved the brand : ' + brand);
    } catch (e) {
        res.send('Error occurred ' + e);
    }
}

getBrand = async (req, res) => {
    try {
        const brand = await Brand.findByPk(req.params.brandId);
        res.status(200).json(brand);
    } catch (e) {
        res.send('Error occurred ' + e);
    }
}

updateBrand = async (req, res) => {
    try {
        const updatedBrand = await Brand.update(req.body, { where: { id: req.params.brandId } });
        res.send('Successfully updated the brand : ' + updatedBrand);
    } catch (e) {
        res.send(e);
    }
}
// replaceBrand = async (req, res) => {
//     try {
//         const replacedBrand = await Brand.findOneAndReplace({ _id: req.params.brandId }, req.body, { new: true });
//         res.send('Successfully replaced the brand : ' + replacedBrand);
//     } catch (e) {
//         res.send(e);
//     }
// }

deleteBrand = async (req, res) => {
    try {
        const deletedBrand = await Brand.destroy({
            where: {
                id: req.params.brandId
            }
        });
        res.send('Successfully deleted the brand : ' + deletedBrand);
    } catch (e) {
        res.send(e);
    }
}

module.exports = {
    getAllBrands,
    addBrand,
    deleteAllBrands,
    getBrand,
    //replaceBrand,
    updateBrand,
    deleteBrand
};