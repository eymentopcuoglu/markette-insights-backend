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
            this.belongsTo(models['Category'], { as: 'category', foreignKey: 'category_id' });
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
        client_id: {
            allowNull: false,
            type: DataTypes.INTEGER.UNSIGNED,
            primaryKey: true
        },
        product_id: {
            type: DataTypes.STRING(45),
            references: {
                model: 'barcode_lists',
                key: 'productid'
            },
            allowNull: false,
            primaryKey: true
        },
        category_id: {
            type: DataTypes.INTEGER.UNSIGNED,
            references: {
                model: 'Category',
                key: 'id'
            },
            allowNull: false
        }
    }, {
        sequelize,
        tableName: 'Client_Product_Category',
        timestamps: false,
        underscored: true,
        charset: 'utf8mb4',
        collate: 'utf8mb4_unicode_ci'
    });
    return ClientProducts;
};