const router = require('express').Router();
const subBrandController = require('../controllers/subBrandController');

router.get('/', subBrandController.getAllSubBrands);
router.post('/', subBrandController.addSubBrand);
router.delete('/', subBrandController.deleteAllSubBrands);
router.get('/:subBrandId', subBrandController.getSubBrand);
//router.put('/:subBrandId', subBrandController.replaceSubBrand);
router.patch('/:subBrandId', subBrandController.updateSubBrand);
router.delete('/:subBrandId', subBrandController.deleteSubBrand);

module.exports = router;