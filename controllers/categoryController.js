const Category = require('../models/index')['Category'];

getAllCategories = async (req, res) => {
    try {
        console.log(Category);
        const categories = await Category.findAll();
        res.status(200).json(categories);
    } catch (e) {
        res.send('Error occurred ' + e);
    }
}

deleteAllCategories = async (req, res) => {
    try {
        const deletedCategories = await Category.destroy({ truncate: true });
        res.send('Successfully deleted all the categories : ' + deletedCategories);
    } catch (e) {
        res.send('Error occurred ' + e);
    }
}

addCategory = async (req, res) => {
    try {
        const category = await Category.create({
            name: req.body.name
        }, { fields: ['name'] });
        res.send('Successfully saved the category : ' + category);
    } catch (e) {
        res.send('Error occurred ' + e);
    }
}

getCategory = async (req, res) => {
    try {
        const category = await Category.findByPk(req.params.categoryId);
        res.status(200).json(category);
    } catch (e) {
        res.send('Error occurred ' + e);
    }
}

updateCategory = async (req, res) => {
    try {
        const updatedCategory = await Category.update(req.body, { where: { id: req.params.categoryId } });
        res.send('Successfully updated the category : ' + updatedCategory);
    } catch (e) {
        res.send(e);
    }
}
// replaceCategory = async (req, res) => {
//     try {
//         const replacedCategory = await Category.findOneAndReplace({ _id: req.params.categoryId }, req.body, { new: true });
//         res.send('Successfully replaced the category : ' + replacedCategory);
//     } catch (e) {
//         res.send(e);
//     }
// }

deleteCategory = async (req, res) => {
    try {
        const deletedCategory = await Category.destroy({
            where: {
                id: req.params.categoryId
            }
        });
        res.send('Successfully deleted the category : ' + deletedCategory);
    } catch (e) {
        res.send(e);
    }
}

module.exports = {
    getAllCategories,
    addCategory,
    deleteAllCategories,
    getCategory,
    //replaceCategory,
    updateCategory,
    deleteCategory
};