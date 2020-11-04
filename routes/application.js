const router = require('express').Router();
const applicationController = require('../controllers/applicationController');

router.get('/initial/:clientId/:userId', applicationController.getInitialData);
router.get('/product-analysis/:productId/:startDate/:endDate', applicationController.getProductAnalysisDateRangeChartData);

module.exports = router;