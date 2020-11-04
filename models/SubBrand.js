'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class SubBrand extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            this.belongsTo(models['Brand'], { foreignKey: 'brand_id' });
            this.hasMany(models['BarcodeList'], { foreignKey: 'brand_id' });
        }
    }

    SubBrand.init({
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER.UNSIGNED
        },
        name: {
            type: DataTypes.STRING
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
        tableName: 'sub_brands',
        underscored: true,
        timestamps: false,
        charset: 'utf8mb4',
        collate: 'utf8mb4_unicode_ci'
    });
    return SubBrand;
};