const SubCategory = require('../models/index')['SubCategory'];

getAllSubCategories = async (req, res) => {
    try {
        console.log(SubCategory);
        const subCategories = await SubCategory.findAll();
        res.status(200).json(subCategories);
    } catch (e) {
        res.send('Error occurred ' + e);
    }
}

deleteAllSubCategories = async (req, res) => {
    try {
        const deletedSubCategories = await SubCategory.destroy({ truncate: true });
        res.send('Successfully deleted all the subCategories : ' + deletedSubCategories);
    } catch (e) {
        res.send('Error occurred ' + e);
    }
}

addSubCategory = async (req, res) => {
    try {
        const subCategory = await SubCategory.create({
            name: req.body.name,
            category_id: req.body.category_id
        }, { fields: ['name', 'category_id'] });
        res.send('Successfully saved the subCategory : ' + subCategory);
    } catch (e) {
        res.send('Error occurred ' + e);
    }
}

getSubCategory = async (req, res) => {
    try {
        const subCategory = await SubCategory.findByPk(req.params.subCategoryId);
        res.status(200).json(subCategory);
    } catch (e) {
        res.send('Error occurred ' + e);
    }
}

updateSubCategory = async (req, res) => {
    try {
        const updatedSubCategory = await SubCategory.update(req.body, { where: { id: req.params.subCategoryId } });
        res.send('Successfully updated the subCategory : ' + updatedSubCategory);
    } catch (e) {
        res.send(e);
    }
}
// replaceSubCategory = async (req, res) => {
//     try {
//         const replacedSubCategory = await SubCategory.findOneAndReplace({ _id: req.params.subCategoryId }, req.body, { new: true });
//         res.send('Successfully replaced the subCategory : ' + replacedSubCategory);
//     } catch (e) {
//         res.send(e);
//     }
// }

deleteSubCategory = async (req, res) => {
    try {
        const deletedSubCategory = await SubCategory.destroy({
            where: {
                id: req.params.subCategoryId
            }
        });
        res.send('Successfully deleted the subCategory : ' + deletedSubCategory);
    } catch (e) {
        res.send(e);
    }
}

module.exports = {
    getAllSubCategories,
    addSubCategory,
    deleteAllSubCategories,
    getSubCategory,
    //replaceSubCategory,
    updateSubCategory,
    deleteSubCategory
};