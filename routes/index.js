const authRoutes = require('./authRoutes');
const clientRoutes = require('./clients');
const channelRoutes = require('./channels');
const productRoutes = require('./products');
const userFiltersRoutes = require('./userFilters');
const marketRoutes = require('./markets');
const categoryRoutes = require('./categories');
const brandRoutes = require('./brands');
const clientProductsRoutes = require('./clientProducts');
const userProductsRoutes = require('./userProducts');
const productComparisonRoutes = require('./productComparison');


const applicationRoutes = require('./application');

module.exports = {
    authRoutes,
    applicationRoutes,
    clientRoutes,
    userFiltersRoutes,
    channelRoutes,
    productRoutes,
    marketRoutes,
    categoryRoutes,
    brandRoutes,
    clientProductsRoutes,
    userProductsRoutes,
    productComparisonRoutes
}