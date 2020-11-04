const router = require('express').Router();
const categoryController = require('../controllers/categoryController');

router.get('/', categoryController.getAllCategories);
router.post('/', categoryController.addCategory);
router.delete('/', categoryController.deleteAllCategories);
router.get('/:categoryId', categoryController.getCategory);
//router.put('/:categoryId', categoryController.replaceCategory);
router.patch('/:categoryId', categoryController.updateCategory);
router.delete('/:categoryId', categoryController.deleteCategory);

module.exports = router;
