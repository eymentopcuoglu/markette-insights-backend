require('dotenv').config();

module.exports = {
    development: {
        username: 'root',
        password: 'G$8wdjvFanvNb!KC',
        database: 'markette',
        host: 'localhost',
        port: 3306,
        dialect: 'mysql',
        define: {
            charset: "utf8mb4",
            dialectOptions: {
                collate: "utf8mb4_unicode_ci"
            }
        }
    },
    production: {
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        host: process.env.DB_HOSTNAME,
        port: process.env.DB_PORT,
        dialect: 'mysql',
        define: {
            charset: "utf8mb4",
            dialectOptions: {
                collate: "utf8mb4_unicode_ci"
            }
        }
    }
};