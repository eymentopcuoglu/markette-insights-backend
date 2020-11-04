'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('userb2b_filters', {
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
            user_id: {
                allowNull: false,
                type: Sequelize.BIGINT(20).UNSIGNED,
                references: {
                    model: 'users_b2b',
                    key: 'id'
                }
            },
            category: {
                type: Sequelize.STRING(45)
            },
            sub_category: {
                type: Sequelize.STRING(45)
            },
            brand: {
                type: Sequelize.STRING(45)
            },
            sub_brand: {
                type: Sequelize.STRING(45)
            },
            channel: {
                type: Sequelize.STRING(45)
            },
            retailer: {
                type: Sequelize.STRING(45)
            },
            size: {
                type: Sequelize.STRING(45)
            },
            sku: {
                type: Sequelize.STRING(45)
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
        await queryInterface.dropTable('userb2b_filters');
    }
};