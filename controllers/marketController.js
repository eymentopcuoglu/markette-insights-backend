const Market = require('../models/index')['Market'];

getAllMarkets = async (req, res) => {
    try {
        const markets = await Market.findAll();
        res.status(200).json(markets);
    } catch (e) {
        res.send('Error occurred ' + e);
    }
}

deleteAllMarkets = async (req, res) => {
    try {
        const deletedMarkets = await Market.destroy({ truncate: true });
        res.send('Successfully deleted all the markets : ' + deletedMarkets);
    } catch (e) {
        res.send('Error occurred ' + e);
    }
}

addMarket = async (req, res) => {
    try {
        const market = await Market.create({
            name: req.body.name,
            image: req.body.image
        }, { fields: ['name', 'image'] });
        res.send('Successfully saved the market : ' + market);
    } catch (e) {
        res.send('Error occurred ' + e);
    }
}

getMarket = async (req, res) => {
    try {
        const market = await Market.findByPk(req.params.marketId, { underscored: true });
        res.status(200).json(market);
    } catch (e) {
        res.send('Error occurred ' + e);
    }
}

updateMarket = async (req, res) => {
    try {
        const updatedMarket = await Market.update(req.body, { where: { id: req.params.marketId } });
        res.send('Successfully updated the market : ' + updatedMarket);
    } catch (e) {
        res.send(e);
    }
}
// replaceMarket = async (req, res) => {
//     try {
//         const replacedMarket = await Market.findOneAndReplace({ _id: req.params.marketId }, req.body, { new: true });
//         res.send('Successfully replaced the market : ' + replacedMarket);
//     } catch (e) {
//         res.send(e);
//     }
// }

deleteMarket = async (req, res) => {
    try {
        const deletedMarket = await Market.destroy({
            where: {
                id: req.params.marketId
            }
        });
        res.send('Successfully deleted the market : ' + deletedMarket);
    } catch (e) {
        res.send(e);
    }
}

module.exports = {
    getAllMarkets,
    addMarket,
    deleteAllMarkets,
    getMarket,
    //replaceMarket,
    updateMarket,
    deleteMarket
};