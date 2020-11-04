'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {

        await queryInterface.addColumn(
            'sub_categories', // name of Source model
            'category_id', // name of the key we're adding
            {
                type: Sequelize.INTEGER.UNSIGNED,
                references: {
                    model: 'categories'
                },
                after: 'name'
            }, {
                charset: 'utf8mb4',
                collate: 'utf8mb4_unicode_ci',
                underscored: true
            });
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.removeColumn('sub_categories', 'category_id');
    }
};
