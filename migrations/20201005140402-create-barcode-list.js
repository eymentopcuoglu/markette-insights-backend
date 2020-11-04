'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('barcode_lists', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.BIGINT(20).UNSIGNED,
            },
            name: {
                type: Sequelize.STRING(255),
                allowNull: false,
            },
            barcode: {
                type: Sequelize.STRING(255),
                allowNull: false,
            },
            productid: {
                type: Sequelize.STRING(45),
                defaultValue: null
            },
            imageurl: {
                type: Sequelize.STRING(255),
                defaultValue: null
            },
            price: {
                type: Sequelize.STRING(255),
                allowNull: false,
            },
            category1: {
                type: Sequelize.STRING(255),
                allowNull: false,
            },
            category2: {
                type: Sequelize.STRING(255),
                allowNull: false,
            },
            category3: {
                type: Sequelize.STRING(255),
                allowNull: false,
            },
            brand_id: {
                type: Sequelize.INTEGER.UNSIGNED,
                allowNull: false,
            },
            size: {
                type: Sequelize.STRING(45),
                allowNull: false,
            },
            sizetype: {
                type: Sequelize.STRING(45),
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
        await queryInterface.dropTable('barcode_lists');
    }
};