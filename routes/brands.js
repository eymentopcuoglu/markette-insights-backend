const router = require('express').Router();
const brandController = require('../controllers/brandController');

router.get('/', brandController.getAllBrands);
router.post('/', brandController.addBrand);
router.delete('/', brandController.deleteAllBrands);
router.get('/:brandId', brandController.getBrand);
//router.put('/:brandId', brandController.replaceBrand);
router.patch('/:brandId', brandController.updateBrand);
router.delete('/:brandId', brandController.deleteBrand);

module.exports = router;