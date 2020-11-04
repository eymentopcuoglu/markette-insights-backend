'use strict';
const { Model } = require('sequelize');
const bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {

    class User extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of DataTypes lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            this.belongsTo(models['Client'], { foreignKey: 'client_id' });
        }

        static async login(email, password) {
            const user = await this.findOne({ where: { email } });
            if (user) {
                const isAuthenticated = await bcrypt.compare(password, user.password);
                if (isAuthenticated) return user;
                else throw Error('Incorrect password!');
            } else {
                throw Error('Incorrect email!');
            }
        }
    }

    User.init({
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.BIGINT(20).UNSIGNED
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: {
                    args: true,
                    msg: 'Invalid email!'
                },
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: {
                    args: [8, 32],
                    msg: 'Password length must be between 8 and 32!'
                }
            }
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
        tableName: 'users_b2b',
        underscored: true,
        timestamps: false,
        charset: 'utf8mb4',
        collate: 'utf8mb4_unicode_ci'
    });

    User.beforeCreate(async (user) => {
        const salt = await bcrypt.genSalt();
        user.password = await bcrypt.hash(user.password, salt);
        user.email = user.email.toLowerCase();
    });
    return User;
};