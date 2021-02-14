'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Category extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            this.hasMany(models['SubCategory'], { foreignKey: 'category_id' });
            this.hasMany(models['ClientProducts'], { foreignKey: 'category_id' });
            this.belongsTo(models['Category'], { as: 'parent_category', foreignKey: 'parent_category_id' })
        }
    }

    Category.init({
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER.UNSIGNED
        },
        name: {
            type: DataTypes.STRING
        },
        parent_category_id: {
            type: DataTypes.INTEGER.UNSIGNED
        }
    }, {
        sequelize,
        tableName: 'Category',
        underscored: true,
        timestamps: false,
        charset: 'utf8mb4',
        collate: 'utf8mb4_unicode_ci'
    });
    return Category;
};