const Product = require('../models/index')['Product'];

const { Op } = require('sequelize');
const sequelize = require('../models/index').sequelize;
const moment = require('moment');

const getData = async (req, res) => {
    let data = [];

    const firstProduct = req.query.firstProduct;
    const secondProduct = req.query.secondProduct;
    let retailers;
    if (req.query.retailers) {
        retailers = req.query.retailers.split(',');
        retailers = {
            market: {
                [Op.in]: retailers
            }
        }
    }

    try {
        data = await Product.findAll({
            attributes: [
                'productid',
                [sequelize.fn('AVG', sequelize.col('pricen')), 'average'],
                'created_at'
            ],
            where: {
                productid: {
                    [Op.or]: [firstProduct, secondProduct]
                },
                ...retailers
            },
            group: [sequelize.fn('MONTH', sequelize.col('created_at')), 'productid'],
            order: sequelize.col('created_at')
        });
        const firstProductData = {
            id: firstProduct,
            data: []
        };
        const secondProductData = {
            id: secondProduct,
            data: []
        };
        const months = new Set();
        data.forEach(element => {
            element = element.toJSON();
            months.add('' + moment(element.created_at).format('MMMM'));
            if (element.productid === firstProduct)
                firstProductData.data.push(Math.round(element.average) / 100)
            else
                secondProductData.data.push(Math.round(element.average) / 100)
        });
        res.status(200).json({ firstProductData, secondProductData, months: Array.from(months) });
    } catch (e) {
        res.json({ error: e });
    }
}


module.exports = {
    getData
};