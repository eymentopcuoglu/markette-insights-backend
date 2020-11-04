const router = require('express').Router();
const clientController = require('../controllers/clientController');

router.get('/', clientController.getAllClients);
router.post('/', clientController.addClient);
router.delete('/', clientController.deleteAllClients);
router.get('/:clientId', clientController.getClient);
//router.put('/:clientId', clientController.replaceClient);
router.patch('/:clientId', clientController.updateClient);
router.delete('/:clientId', clientController.deleteClient);

module.exports = router;
