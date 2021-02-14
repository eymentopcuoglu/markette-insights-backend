const Market = require('../models/index')['Market'];
const Channel = require('../models/index')['Channel'];

const Category = require('../models/index')['Category'];
const Brand = require('../models/index')['Brand'];
const Supplier = require('../models/index')['Supplier'];
const Insert = require('../models/index')['Insert'];

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
const dataNormalizationUtil = require('../utils/dataNormalizationUtil');

const getInitialData = async (req, res) => {
    let data = {};
    const clientId = req.params.clientId;
    const userId = req.params.userId;
    const requestDate = moment(new Date()).endOf('day').toDate();
    const startDate = moment(requestDate).subtract(6, 'day').startOf('day').toDate();

    try {
        const channels = await Channel.findAll({ attributes: ['id', 'name'] });
        const markets = await Market.findAll({ attributes: ['id', 'name', 'image', 'channel_id'] });

        let clientProducts = await ClientProducts.findAll({
            attributes: ['product_id', 'category_id'],
            where: { client_id: clientId },
            include: [{
                model: CurrentProduct,
                as: 'current_product_transactions',
                attributes: ['pricen', 'market'],
            }, {
                model: BarcodeList,
                as: 'product_info',
                attributes: ['name', 'imageurl', 'brand_id'],
                include: [{
                    model: Brand,
                    as: 'brand',
                    attributes: ['id', 'name', 'supplier_id', 'parent_brand_id'],
                    include: [{
                        model: Brand,
                        as: 'parent_brand',
                        attributes: ['id', 'name', 'supplier_id'],
                        include: [{
                            model: Supplier,
                            as: 'supplier',
                            attributes: ['id', 'name'],
                        }]
                    },
                        {
                            model: Supplier,
                            as: 'supplier',
                            attributes: ['id', 'name'],
                        }
                    ]
                }]
            }, {
                model: Log,
                as: 'logs',
                attributes: ['market', 'pricen1', 'pricen2', 'created_at']
            }, {
                model: Category,
                as: 'category',
                attributes: ['id', 'name', 'parent_category_id'],
                include: [{
                    model: Category,
                    as: 'parent_category',
                    attributes: ['id', 'name'],
                }
                ]
            }
            ]
        });

        let categories = new Map();
        let subCategories = new Map();
        let brands = new Map();
        let subBrands = new Map();
        let suppliers = new Map();

        clientProducts = clientProducts.map(element => {
                const resultingElement = {
                    product_id: element.product_id,
                    current_product_transactions: element.current_product_transactions,
                    logs: element.logs,
                    product_info: {
                        name: element.product_info.name,
                        imageurl: element.product_info.imageurl
                    }
                }
                if (element.product_info.brand.parent_brand) {
                    brands.set(element.product_info.brand.parent_brand.id, {
                        id: element.product_info.brand.parent_brand.id,
                        name: element.product_info.brand.parent_brand.name,
                        supplier_id: element.product_info.brand.parent_brand.supplier_id
                    });
                    subBrands.set(element.product_info.brand.id, {
                        id: element.product_info.brand.id,
                        name: element.product_info.brand.name,
                        brand_id: element.product_info.brand.parent_brand_id
                    });
                    suppliers.set(element.product_info.brand.parent_brand.supplier.id, {
                        id: element.product_info.brand.parent_brand.supplier.id,
                        name: element.product_info.brand.parent_brand.supplier.name
                    });
                    resultingElement.product_info.brand_id = element.product_info.brand.parent_brand.id;
                    resultingElement.product_info.sub_brand_id = element.product_info.brand.id;
                } else {
                    brands.set(element.product_info.brand.id, {
                        id: element.product_info.brand.id,
                        name: element.product_info.brand.name,
                        supplier_id: element.product_info.brand.supplier_id
                    });
                    suppliers.set(element.product_info.brand.supplier.id, {
                        id: element.product_info.brand.supplier.id,
                        name: element.product_info.brand.supplier.name
                    });
                    resultingElement.product_info.brand_id = element.product_info.brand.id;
                    resultingElement.product_info.sub_brand_id = null;
                }

                if (element.category.parent_category) {
                    categories.set(element.category.parent_category.id, {
                        id: element.category.parent_category.id,
                        name: element.category.parent_category.name
                    });
                    subCategories.set(element.category.id, {
                        id: element.category.id,
                        name: element.category.name,
                        category_id: element.category.parent_category_id
                    });
                    resultingElement.product_info.category_id = element.category.parent_category.id;
                    resultingElement.product_info.sub_category_id = element.category.id;
                } else {
                    categories.set(element.category.id, {
                        id: element.category.id,
                        name: element.category.name
                    });
                    resultingElement.product_info.category_id = element.category.id;
                    resultingElement.product_info.sub_category_id = null;
                }
                return resultingElement;
            }
        );


        categories = dataNormalizationUtil.removeDuplicatesById(categories);
        subCategories = dataNormalizationUtil.removeDuplicatesById(subCategories);
        brands = dataNormalizationUtil.removeDuplicatesById(brands);
        subBrands = dataNormalizationUtil.removeDuplicatesById(subBrands);
        suppliers = dataNormalizationUtil.removeDuplicatesById(suppliers);

        const numberOfProducts = clientProducts.length;
        const averageStandardDeviation = getAverageStandardDeviation(clientProducts);

        let userProducts = await UserProducts.findAll({
            attributes: ['product_id'],
            include: [{
                model: Product,
                required: false,
                as: 'product_transactions',
                where: {
                    created_at: {
                        [Op.between]: [startDate, requestDate]
                    }
                },
                attributes: ['pricen', 'market', 'created_at'],
            }],
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
                product_name: product.product_info.name,
                product_transactions: item.product_transactions
            }
        });

        //Sort by availability
        clientProducts.sort((a, b) => {
            if (a.current_product_transactions.length > b.current_product_transactions.length) return -1;
            else if (a.current_product_transactions.length === b.current_product_transactions.length) return 0;
            else return 1;
        });

        const client = await Client.findByPk(clientId, { attributes: ['id', 'name', 'image'] });
        data = {
            categories,
            subCategories,
            brands,
            subBrands,
            suppliers,
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

//Gets the pricing information of products on the given date
//USAGE: api.markette-insights.com/application/overview?client=1&date=01.02.2021
const getAllProductPricingWithDate = async (req, res) => {
    let data = {};
    const clientId = req.query.client;
    const startOfTheDay = moment(req.query.date).startOf('day').toDate();
    const endOfTheDay = moment(req.query.date).endOf('day').toDate();

    try {
        data = await ClientProducts.findAll({
            attributes: ['product_id', 'category_id'],
            where: { client_id: clientId },
            include: [{
                model: Product,
                required: false,
                as: 'product_transactions',
                where: {
                    created_at: {
                        [Op.between]: [startOfTheDay, endOfTheDay]
                    }
                },
                attributes: ['pricen', 'market'],
            }, {
                model: BarcodeList,
                as: 'product_info',
                attributes: ['name', 'imageurl', 'brand_id']
            }]
        });

        //Sort by availability
        data.sort((a, b) => {
            if (a.product_transactions.length > b.product_transactions.length) return -1;
            else if (a.product_transactions.length === b.product_transactions.length) return 0;
            else return 1;
        });
        res.status(200).json(data);
    } catch (e) {
        res.send(e);
    }
}

const getInserts = async (req, res) => {
    let data = [];


    const startDate = req.query.startDate;
    const endDate = req.query.endDate;
    let channels, retailers, suppliers, categories, brands;
    if (req.query.channels) {
        channels = req.query.channels.split(',');
        channels = {
            channel_id: {
                [Op.in]: channels
            }
        }
    }
    if (req.query.retailers) {
        retailers = req.query.retailers.split(',');
        retailers = {
            id: {
                [Op.in]: retailers
            }
        }
    }
    if (req.query.suppliers) {
        suppliers = req.query.suppliers.split(',');
        suppliers = {
            supplier_id: {
                [Op.in]: suppliers
            }
        }
    }
    if (req.query.categories) {
        categories = req.query.categories.split(',');
        categories = {
            include: {
                model: BarcodeList,
                as: 'products',
                attributes: [],
                required: true,
                include: {
                    model: ClientProducts,
                    as: 'clientProducts',
                    attributes: [],
                    required: true,
                    include: {
                        model: Category,
                        as: 'category',
                        required: true,
                        attributes: [],
                        where: {
                            [Op.or]: [
                                {
                                    id: {
                                        [Op.in]: categories
                                    }
                                },
                                {
                                    parent_category_id: {
                                        [Op.in]: categories
                                    }
                                }
                            ]
                        }
                    }
                }
            }
        };
    }
    if (req.query.brands) {
        brands = req.query.brands.split(',');
        brands = {
            id: {
                [Op.in]: brands
            }
        }
    }

    try {
        data = await Insert.findAll({
            attributes: ['id', 'market_id', 'num_of_pages', 'url', 'start_date', 'end_date', 'duration'],
            where: {
                start_date: {
                    [Op.gte]: startDate
                },
                end_date: {
                    [Op.lte]: endDate
                }
            },
            include: [{
                model: Brand,
                as: 'brands',
                attributes: [],
                where: {
                    ...brands,
                    ...suppliers
                },
                ...categories
            }, {
                model: Market,
                as: 'markets',
                where: {
                    ...retailers,
                    ...channels
                }
            }
            ]
        })
        ;
        res.status(200).json(data);
    } catch (e) {
        res.send(e);
    }
}


module.exports = {
    getInitialData,
    getProductAnalysisDateRangeChartData,
    getAllProductPricingWithDate,
    getInserts
};