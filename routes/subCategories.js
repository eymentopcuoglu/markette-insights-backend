const router = require('express').Router();
const subCategoryController = require('../controllers/subCategoryController');

router.get('/', subCategoryController.getAllSubCategories);
router.post('/', subCategoryController.addSubCategory);
router.delete('/', subCategoryController.deleteAllSubCategories);
router.get('/:subCategoryId', subCategoryController.getSubCategory);
//router.put('/:subCategoryId', subCategoryController.replaceSubCategory);
router.patch('/:subCategoryId', subCategoryController.updateSubCategory);
router.delete('/:subCategoryId', subCategoryController.deleteSubCategory);

module.exports = router;
