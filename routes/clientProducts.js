const router = require('express').Router();
const clientProductController = require('../controllers/clientProductController');

router.get('/', clientProductController.getAllClientProducts);
router.post('/', clientProductController.addClientProduct);
router.delete('/', clientProductController.deleteAllClientProducts);
router.get('/:clientId', clientProductController.getClientProducts);
//router.put('/:clientId', clientProductController.replaceClientProduct);
//router.patch('/:clientId', clientProductController.updateClientProduct);
router.delete('/:clientId', clientProductController.deleteClientProducts);

module.exports = router;
