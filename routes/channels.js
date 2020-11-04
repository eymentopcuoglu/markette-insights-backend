const router = require('express').Router();
const channelController = require('../controllers/channelController');

router.get('/', channelController.getAllChannels);
router.post('/', channelController.addChannel);
router.delete('/', channelController.deleteAllChannels);
router.get('/:channelId', channelController.getChannel);
//router.put('/:channelId', channelController.replaceChannel);
router.patch('/:channelId', channelController.updateChannel);
router.delete('/:channelId', channelController.deleteChannel);

module.exports = router;
