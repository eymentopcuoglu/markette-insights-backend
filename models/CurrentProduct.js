'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class CurrentProduct extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of DataTypes lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            this.belongsTo(models['Market'], { foreignKey: 'market' });
            this.belongsToMany(models['SubCategory'], {
                through: 'client_products',
                foreignKey: 'product_id',
                otherKey: 'category_id'
            });
            this.hasMany(models['ClientProducts'], { foreignKey: 'productid' });
        }
    }

    CurrentProduct.init({
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER(11),
        },
        productid: {
            type: DataTypes.STRING(45),
            defaultValue: null
        },
        name: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        barcode: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        price: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        market: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        category1: {
            type: DataTypes.STRING(45),
            allowNull: false,
        },
        category2: {
            type: DataTypes.STRING(45),
            allowNull: false,
        },
        category3: {
            type: DataTypes.STRING(45),
            allowNull: false,
        },
        isitonopportunities: {
            type: DataTypes.STRING(45),
            allowNull: false,
        },
        opportunitieschecked: {
            type: DataTypes.STRING(45),
            allowNull: false,
        },
        opportunitiesrate: {
            type: DataTypes.STRING(45),
            allowNull: false,
        },
        order: {
            type: DataTypes.STRING(45),
            allowNull: false,
        },
        pricen: {
            type: DataTypes.STRING(45),
            allowNull: false,
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
        tableName: 'products',
        underscored: true,
        timestamps: false,
        charset: 'utf8mb4',
        collate: 'utf8mb4_unicode_ci'
    });
    return CurrentProduct;
};