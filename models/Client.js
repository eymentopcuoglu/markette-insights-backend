'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Client extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            this.hasMany(models['User'], { foreignKey: 'client_id' });
            this.hasMany(models['ClientProducts'], { foreignKey: 'client_id' });
        }
    }

    Client.init({
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER.UNSIGNED
        },
        name: {
            type: DataTypes.STRING
        },
        image: {
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
        tableName: 'clients',
        timestamps: false,
        underscored: true,
        charset: 'utf8mb4',
        collate: 'utf8mb4_unicode_ci'
    });
    return Client;
};