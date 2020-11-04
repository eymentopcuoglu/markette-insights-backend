'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('products2s', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER(10).UNSIGNED,
            },
            productid: {
                type: Sequelize.STRING(45),
                defaultValue: null
            },
            name: {
                type: Sequelize.STRING(255),
                allowNull: false,
            },
            barcode: {
                type: Sequelize.STRING(255),
                allowNull: false,
            },
            price: {
                type: Sequelize.STRING(255),
                allowNull: false,
            },
            market: {
                type: Sequelize.STRING(255),
                allowNull: false,
            },
            category1: {
                type: Sequelize.STRING(255),
                allowNull: false,
            },
            category2: {
                type: Sequelize.STRING(45),
                allowNull: false,
            },
            category3: {
                type: Sequelize.STRING(45),
                allowNull: false,
            },
            isitonopportunities: {
                type: Sequelize.STRING(255),
                allowNull: false,
            },
            opportunitieschecked: {
                type: Sequelize.STRING(255),
                allowNull: false,
            },
            opportunitiesrate: {
                type: Sequelize.STRING(255),
                allowNull: false,
            },
            order: {
                type: Sequelize.STRING(45),
                allowNull: false,
            },
            pricen: {
                type: Sequelize.INTEGER(11),
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
        await queryInterface.dropTable('products2s');
    }
};