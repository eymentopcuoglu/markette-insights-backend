'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class SubCategory extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            this.belongsTo(models['Category'], { foreignKey: 'category_id' });
            this.belongsToMany(models['Product'], {
                through: 'client_products',
                foreignKey: 'category_id',
                otherKey: 'product_id'
            });
            this.belongsToMany(models['CurrentProduct'], {
                through: 'client_products',
                foreignKey: 'category_id',
                otherKey: 'product_id'
            });
        }
    }

    SubCategory.init({
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
        tableName: 'sub_categories',
        underscored: true,
        timestamps: false,
        charset: 'utf8mb4',
        collate: 'utf8mb4_unicode_ci'
    });
    return SubCategory;
};