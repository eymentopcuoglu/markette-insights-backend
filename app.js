const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
require('dotenv').config();

const routes = require('./routes/index');
const middlewares = require('./middlewares/index');

const app = express();
const port = process.env.PORT || 8000;

const corsOptions = {
    origin: 'https://www.markette-insights.com',
    optionsSuccessStatus: 200,
    credentials: true
};

//Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors(corsOptions));

//Routes
app.use('/users', routes.authRoutes);
app.use('/filters', middlewares.authMiddleware.requireAuth, routes.userFiltersRoutes);
app.use('/clients', middlewares.authMiddleware.requireAuth, routes.clientRoutes);
app.use('/channels', middlewares.authMiddleware.requireAuth, routes.channelRoutes);
app.use('/markets', middlewares.authMiddleware.requireAuth, routes.marketRoutes);
app.use('/categories', middlewares.authMiddleware.requireAuth, routes.categoryRoutes);
app.use('/brands', middlewares.authMiddleware.requireAuth, routes.brandRoutes);
app.use('/client-products', middlewares.authMiddleware.requireAuth, routes.clientProductsRoutes);
app.use('/user-products', middlewares.authMiddleware.requireAuth, routes.userProductsRoutes);

app.use('/application', middlewares.authMiddleware.requireAuth, routes.applicationRoutes);


app.get('/', (req, res) => {
    res.status(200).json({ msg: 'Success!' });
});

app.listen(port, () => {
    console.log('Server started on port ' + port);
});