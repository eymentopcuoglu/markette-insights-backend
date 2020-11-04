'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('Logs', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            productid: {
                type: Sequelize.STRING(45),
                defaultValue: null
            },
            price1: {
                type: Sequelize.STRING(445),
                allowNull: false,
            },
            price2: {
                type: Sequelize.STRING(445),
                allowNull: false,
            },
            market: {
                type: Sequelize.STRING(445),
                allowNull: false,
            },
            pricen1: {
                type: Sequelize.STRING(50),
                allowNull: false,
            },
            pricen2: {
                type: Sequelize.STRING(50),
                allowNull: false,
            },
            created_at: {
                allowNull: false,
                type: 'TIMESTAMP',
                defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
            },
            updated_at: {
                allowNull: false,
                type: 'TIMESTAMP',
                defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'),
            }
        }, {
            charset: 'utf8mb4',
            collate: 'utf8mb4_unicode_ci',
            underscored: true
        });
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('Logs');
    }
};