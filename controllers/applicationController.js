const Market = require('../models/index')['Market'];
const Channel = require('../models/index')['Channel'];

const Category = require('../models/index')['Category'];
const SubCategory = require('../models/index')['SubCategory'];

const Brand = require('../models/index')['Brand'];
const SubBrand = require('../models/index')['SubBrand'];

const BarcodeList = require('../models/index')['BarcodeList'];
const Client = require('../models/index')['Client'];
const Product = require('../models/index')['Product'];
const CurrentProduct = require('../models/index')['CurrentProduct'];
const Log = require('../models/index')['Log'];

const ClientProducts = require('../models/index')['ClientProducts'];
const UserProducts = require('../models/index')['UserProducts'];
const UserFilters = require('../models/index')['UserFilters'];

const moment = require('moment');
const sequelize = require('../models/index').sequelize;
const { Op } = require('sequelize');

const getAverageStandardDeviation = require('../utils/mathUtil').getAverageStandardDeviation;

const getInitialData = async (req, res) => {
    let data = {};
    const clientId = req.params.clientId;
    const userId = req.params.userId;
    const requestDate = moment(new Date()).endOf('day').toDate();
    const startDate = moment(requestDate).subtract(6, 'day').startOf('day').toDate();

    try {
        const channels = await Channel.findAll({ attributes: ['id', 'name'] });
        const markets = await Market.findAll({ attributes: ['id', 'name', 'image', 'channel_id'] });
        const categories = await Category.findAll({ attributes: ['id', 'name'] });
        const subCategories = await SubCategory.findAll({ attributes: ['id', 'name', 'category_id'] });
        const brands = await Brand.findAll({ attributes: ['id', 'name'] });
        const subBrands = await SubBrand.findAll({ attributes: ['id', 'name', 'brand_id'] });

        const clientProducts = await ClientProducts.findAll({
            attributes: ['product_id', 'category_id'],
            where: { client_id: clientId },
            include: [{
                model: Product,
                as: 'product_transactions',
                where: {
                    created_at: {
                        [Op.between]: [startDate, requestDate]
                    }
                },
                attributes: ['pricen', 'market', 'created_at'],
            }, {
                model: CurrentProduct,
                as: 'current_product_transactions',
                attributes: ['pricen', 'market'],
            }, {
                model: BarcodeList,
                as: 'product_info',
                attributes: ['name', 'imageurl']
            }, {
                model: Log,
                as: 'logs',
                attributes: ['market', 'pricen1', 'pricen2', 'created_at']
            }]
        });
        const numberOfProducts = clientProducts.length;
        const averageStandardDeviation = getAverageStandardDeviation(clientProducts);

        let userProducts = await UserProducts.findAll({
            attributes: ['product_id'],
            where: { user_id: userId }
        });
        let userFilters = await UserFilters.findAll({
            where: { user_id: userId }
        });


        //Getting the number of retailers info
        const availableRetailers = [];
        clientProducts.forEach(product => {
            product.current_product_transactions.forEach(pricing => {
                if (!availableRetailers.includes(pricing.market))
                    availableRetailers.push(pricing.market);
            });
        });
        const numberOfRetailers = availableRetailers.length;


        //Adding product_name to userProducts using the response returned from clientProducts
        userProducts = userProducts.map((item) => {
            const product = clientProducts.find(element => element.product_id === item.product_id);
            return {
                product_id: item.product_id,
                product_name: product.product_info.name
            }
        });

        const client = await Client.findByPk(clientId, { attributes: ['id', 'name', 'image'] });
        data = {
            brands,
            subBrands,
            categories,
            subCategories,
            channels,
            markets,
            client,
            numberOfProducts,
            numberOfRetailers,
            averageStandardDeviation,
            clientProducts,
            userProducts,
            userFilters
        };
        res.status(200).json(data);
    } catch (e) {
        res.send('Error occurred ' + e);
    }
}

const getProductAnalysisDateRangeChartData = async (req, res) => {
    let data = {};

    try {
        data = await Product.findAll({
            attributes: ['pricen', 'market', 'created_at'],
            where: {
                productid: req.params.productId,
                created_at: {
                    [Op.between]: [req.params.startDate, req.params.endDate]
                }
            }
        });
        res.status(200).json(data);
    } catch (e) {
        res.send(e);
    }
}


module.exports = {
    getInitialData,
    getProductAnalysisDateRangeChartData
};