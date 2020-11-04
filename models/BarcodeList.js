'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class BarcodeList extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            this.belongsTo(models['SubBrand'], { foreignKey: 'brand_id' });
            this.hasMany(models['ClientProducts'], {
                sourceKey: 'productid',
                foreignKey: 'product_id',
            });
        }
    }

    BarcodeList.init({
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
        barcode: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        productid: {
            type: DataTypes.STRING(45),
            defaultValue: null
        },
        imageurl: {
            type: DataTypes.STRING(255),
            defaultValue: null
        },
        price: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        category1: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        category2: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        category3: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        brand_id: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
        },
        size: {
            type: DataTypes.STRING(45),
            allowNull: false,
        },
        sizetype: {
            type: DataTypes.STRING(45),
            allowNull: false,
        },
        created_at: {
            allowNull: false,
            type: 'TIMESTAMP',
        },
        updated_at: {
            allowNull: false,
            type: 'TIMESTAMP'
        }
    }, {
        sequelize,
        tableName: 'barcode_lists',
        underscored: true,
        timestamps: false,
        charset: 'utf8mb4',
        collate: 'utf8mb4_unicode_ci'
    });
    return BarcodeList;
};

