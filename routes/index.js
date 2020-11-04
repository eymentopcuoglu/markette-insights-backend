const authRoutes = require('./authRoutes');
const clientRoutes = require('./clients');
const channelRoutes = require('./channels');
const productRoutes = require('./products');
const userFiltersRoutes = require('./userFilters');
const marketRoutes = require('./markets');
const categoryRoutes = require('./categories');
const subCategoryRoutes = require('./subCategories');
const brandRoutes = require('./brands');
const subBrandRoutes = require('./subBrands');
const clientProductsRoutes = require('./clientProducts');
const userProductsRoutes = require('./userProducts');


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
    subCategoryRoutes,
    brandRoutes,
    subBrandRoutes,
    clientProductsRoutes,
    userProductsRoutes

}