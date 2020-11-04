'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {

        await queryInterface.addColumn(
            'markets', // name of Source model
            'channel_id', // name of the key we're adding
            {
                type: Sequelize.INTEGER.UNSIGNED,
                references: {
                    model: 'channels'
                }
            }, {
                charset: 'utf8mb4',
                collate: 'utf8mb4_unicode_ci',
                underscored: true
            });
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.removeColumn('markets', 'channel_id');
    }
};