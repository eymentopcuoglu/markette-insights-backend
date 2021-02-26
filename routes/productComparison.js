const router = require('express').Router();
const productComparisonController = require('../controllers/productComparisonController');

router.get('/', productComparisonController.getData);

module.exports = router;