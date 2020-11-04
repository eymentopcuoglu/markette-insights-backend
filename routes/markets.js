const router = require('express').Router();
const marketController = require('../controllers/marketController');

router.get('/', marketController.getAllMarkets);
router.post('/', marketController.addMarket);
router.delete('/', marketController.deleteAllMarkets);
router.get('/:marketId', marketController.getMarket);
//router.put('/:marketId', marketController.replaceMarket);
router.patch('/:marketId', marketController.updateMarket);
router.delete('/:marketId', marketController.deleteMarket);

module.exports = router;
