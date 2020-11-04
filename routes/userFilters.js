const router = require('express').Router();
const userFiltersController = require('../controllers/userFilterController');

router.get('/', userFiltersController.getAllUserFilters);
router.post('/', userFiltersController.addUserFilter);
router.delete('/', userFiltersController.deleteAllUserFilters);
router.get('/:filterId', userFiltersController.getUserFilter);
//router.put('/:filterId', userFiltersController.replaceFilter);
router.patch('/:filterId', userFiltersController.updateUserFilter);
router.delete('/:filterId', userFiltersController.deleteUserFilter);

module.exports = router;
