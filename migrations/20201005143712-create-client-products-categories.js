'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('client_products', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.BIGINT(20).UNSIGNED,
            },
            client_id: {
                allowNull: false,
                type: Sequelize.INTEGER.UNSIGNED,
                references: {
                    model: 'clients',
                    key: 'id'
                }
            },
            product_id: {
                type: Sequelize.STRING(45),
                allowNull: false
            },
            category_id: {
                type: Sequelize.INTEGER.UNSIGNED,
                references: {
                    model: 'sub_categories',
                    key: 'id'
                },
                allowNull: false
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
        await queryInterface.dropTable('client_products');
    }
};