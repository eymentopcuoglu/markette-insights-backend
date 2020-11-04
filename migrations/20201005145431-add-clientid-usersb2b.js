'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.addColumn(
            'users_b2b', // name of Source model
            'client_id', // name of the key we're adding
            {
                type: Sequelize.INTEGER.UNSIGNED,
                references: {
                    model: 'clients'
                },
                after: 'password'
            }, {
                charset: 'utf8mb4',
                collate: 'utf8mb4_unicode_ci',
                underscored: true
            });
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.removeColumn('users_b2b', 'client_id');
    }
};
