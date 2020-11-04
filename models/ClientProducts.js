'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class ClientProducts extends Model {
        static associate(models) {
            this.belongsTo(models['Client'], { foreignKey: 'client_id' });
            this.hasMany(models['Product'], {
                sourceKey: 'product_id',
                foreignKey: 'productid',
                as: 'product_transactions'
            });
            this.hasMany(models['CurrentProduct'], {
                sourceKey: 'product_id',
                foreignKey: 'productid',
                as: 'current_product_transactions'
            });
            this.belongsTo(models['Category'], { foreignKey: 'category_id' });
            this.hasOne(models['BarcodeList'], {
                sourceKey: 'product_id',
                foreignKey: 'productid',
                as: 'product_info'
            });
            this.hasMany(models['Log'], {
                sourceKey: 'product_id',
                foreignKey: 'productid',
                as: 'logs'
            });
        }
    }

    ClientProducts.init({
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.BIGINT(20).UNSIGNED,
        },
        client_id: {
            allowNull: false,
            type: DataTypes.INTEGER.UNSIGNED
        },
        product_id: {
            type: DataTypes.STRING(45),
            references: {
                model: 'products2s',
                key: 'productid'
            },
            allowNull: false
        },
        category_id: {
            type: DataTypes.INTEGER.UNSIGNED,
            references: {
                model: 'sub_categories',
                key: 'id'
            },
            allowNull: false
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
        tableName: 'client_products',
        timestamps: false,
        underscored: true,
        charset: 'utf8mb4',
        collate: 'utf8mb4_unicode_ci'
    });
    return ClientProducts;
};