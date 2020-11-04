'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Log extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of DataTypes lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            this.belongsTo(models['ClientProducts'], { foreignKey: 'productid' });
        }
    }

    Log.init({
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        productid: {
            type: DataTypes.STRING(45),
            defaultValue: null
        },
        price1: {
            type: DataTypes.STRING(445),
            allowNull: false,
        },
        price2: {
            type: DataTypes.STRING(445),
            allowNull: false,
        },
        market: {
            type: DataTypes.STRING(445),
            allowNull: false,
        },
        pricen1: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        pricen2: {
            type: DataTypes.STRING(50),
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
        tableName: 'Logs',
        underscored: true,
        timestamps: false,
        charset: 'utf8mb4',
        collate: 'utf8mb4_unicode_ci'
    });
    return Log;
};