'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Brand extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            this.hasMany(models['BarcodeList'], { as: 'products', foreignKey: 'brand_id' });
            this.belongsTo(models['Supplier'], { as: 'supplier', foreignKey: 'supplier_id' })
            this.belongsToMany(models['Insert'], {
                through: 'Insert_Brand',
                foreignKey: 'brand_id'
            });
            this.belongsTo(models['Brand'], { as: 'parent_brand', foreignKey: 'parent_brand_id' });
        }
    }

    Brand.init({
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER.UNSIGNED
        },
        name: {
            type: DataTypes.STRING
        },
        supplier_id: {
            type: DataTypes.INTEGER.UNSIGNED
        },
        parent_brand_id: {
            type: DataTypes.INTEGER.UNSIGNED
        }
    }, {
        sequelize,
        tableName: 'Brand',
        underscored: true,
        timestamps: false,
        charset: 'utf8mb4',
        collate: 'utf8mb4_unicode_ci'
    });
    return Brand;
};