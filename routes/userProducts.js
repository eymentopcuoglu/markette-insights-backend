const router = require('express').Router();
const userProductController = require('../controllers/userProductController');

router.get('/', userProductController.getAllUserProducts);
router.post('/', userProductController.addUserProduct);
router.delete('/', userProductController.deleteAllUserProducts);
router.get('/:userId', userProductController.getUserProducts);
//router.put('/:userId', userProductController.replaceUserProduct);
//router.patch('/:userId', userProductController.updateUserProduct);
router.delete('/:userId', userProductController.deleteUserProducts);

module.exports = router;
