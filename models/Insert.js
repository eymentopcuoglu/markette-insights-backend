'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Insert extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            this.belongsToMany(models['Brand'], {
                as: 'brands',
                through: 'Insert_Brand',
                foreignKey: 'insert_id'
            });
            this.belongsTo(models['Market'], {
                as: 'markets',
                foreignKey: 'market_id'
            });
        }
    }

    Insert.init({
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER.UNSIGNED
        },
        market_id: {
            type: DataTypes.BIGINT(20).UNSIGNED
        },
        num_of_pages: {
            type: DataTypes.TINYINT.UNSIGNED
        },
        url: {
            type: DataTypes.STRING(150)
        },
        start_date: {
            type: DataTypes.DATEONLY
        },
        end_date: {
            type: DataTypes.DATEONLY
        },
        duration: {
            type: DataTypes.TINYINT
        }
    }, {
        sequelize,
        tableName: 'Insert',
        underscored: true,
        timestamps: false,
        charset: 'utf8mb4',
        collate: 'utf8mb4_unicode_ci'
    });
    return Insert;
};