'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class UserFilters extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of DataTypes lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }

    UserFilters.init({
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.BIGINT(20).UNSIGNED,
        },
        name: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        user_id: {
            allowNull: false,
            type: DataTypes.BIGINT(20).UNSIGNED,
            references: {
                model: 'users_b2b',
                key: 'id'
            }
        },
        category: {
            type: DataTypes.STRING(45)
        },
        sub_category: {
            type: DataTypes.STRING(45)
        },
        brand: {
            type: DataTypes.STRING(45)
        },
        sub_brand: {
            type: DataTypes.STRING(45)
        },
        channel: {
            type: DataTypes.STRING(45)
        },
        retailer: {
            type: DataTypes.STRING(45)
        },
        size: {
            type: DataTypes.STRING(45),
        },
        sku: {
            type: DataTypes.STRING(45),
        },
        created_at: {
            allowNull: false,
            type: 'TIMESTAMP'
        },
        updated_at: {
            allowNull: false,
            type: 'TIMESTAMP'
        }

    }, {
        sequelize,
        tableName: 'userb2b_filters',
        underscored: true,
        timestamps: false,
        charset: 'utf8mb4',
        collate: 'utf8mb4_unicode_ci'
    });
    return UserFilters;
};