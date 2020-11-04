'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Market extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of DataTypes lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            this.belongsTo(models['Channel'], { foreignKey: 'channel_id' });
            this.hasMany(models['Product'], { foreignKey: 'market' });
            this.hasMany(models['CurrentProduct'], { foreignKey: 'market' });
        }
    }

    Market.init({
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.BIGINT(20).UNSIGNED,
        },
        name: {
            type: DataTypes.STRING(45)
        },
        image: {
            type: DataTypes.STRING(245)
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
        tableName: 'markets',
        timestamps: false,
        underscored: true,
        charset: 'utf8mb4',
        collate: 'utf8mb4_unicode_ci'
    });
    return Market;
};