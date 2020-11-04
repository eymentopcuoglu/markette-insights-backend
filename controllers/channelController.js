const Channel = require('../models/index')['Channel'];

getAllChannels = async (req, res) => {
    try {
        console.log(Channel);
        const channels = await Channel.findAll();
        res.status(200).json(channels);
    } catch (e) {
        res.send('Error occurred ' + e);
    }
}

deleteAllChannels = async (req, res) => {
    try {
        const deletedChannels = await Channel.destroy({ truncate: true });
        res.send('Successfully deleted all the channels : ' + deletedChannels);
    } catch (e) {
        res.send('Error occurred ' + e);
    }
}

addChannel = async (req, res) => {
    try {
        const channel = await Channel.create({
            name: req.body.name
        }, { fields: ['name'] });
        res.send('Successfully saved the channel : ' + channel);
    } catch (e) {
        res.send('Error occurred ' + e);
    }
}

getChannel = async (req, res) => {
    try {
        const channel = await Channel.findByPk(req.params.channelId);
        res.status(200).json(channel);
    } catch (e) {
        res.send('Error occurred ' + e);
    }
}

updateChannel = async (req, res) => {
    try {
        const updatedChannel = await Channel.update(req.body, { where: { id: req.params.channelId } });
        res.send('Successfully updated the channel : ' + updatedChannel);
    } catch (e) {
        res.send(e);
    }
}
// replaceChannel = async (req, res) => {
//     try {
//         const replacedChannel = await Channel.findOneAndReplace({ _id: req.params.channelId }, req.body, { new: true });
//         res.send('Successfully replaced the channel : ' + replacedChannel);
//     } catch (e) {
//         res.send(e);
//     }
// }

deleteChannel = async (req, res) => {
    try {
        const deletedChannel = await Channel.destroy({
            where: {
                id: req.params.channelId
            }
        });
        res.send('Successfully deleted the channel : ' + deletedChannel);
    } catch (e) {
        res.send(e);
    }
}

module.exports = {
    getAllChannels,
    addChannel,
    deleteAllChannels,
    getChannel,
    //replaceChannel,
    updateChannel,
    deleteChannel
};