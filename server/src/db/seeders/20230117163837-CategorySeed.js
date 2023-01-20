'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'Categories',
      [
        {
          category: 'car',
          type_id: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          category: 'utilities',
          type_id: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          category: 'mortgage',
          type_id: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          category: 'kids',
          type_id: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          category: 'household',
          type_id: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          category: 'presents',
          type_id: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          category: 'medications',
          type_id: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          category: 'entertainment',
          type_id: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          category: 'taxi',
          type_id: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          category: 'food',
          type_id: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          category: 'restaurant',
          type_id: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          category: 'bank',
          type_id: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          category: 'clothes and shoes',
          type_id: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          category: 'hobby',
          type_id: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          category: 'rent',
          type_id: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          category: 'leisure time',
          type_id: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          category: 'taxes',
          type_id: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          category: 'insurance',
          type_id: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          category: 'personal care',
          type_id: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          category: 'furniture',
          type_id: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          category: 'electronics',
          type_id: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          category: 'internet and mobile',
          type_id: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          category: 'doctors',
          type_id: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          category: 'services',
          type_id: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          category: 'other expencies',
          type_id: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          category: 'salary',
          type_id: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          category: 'dividends',
          type_id: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          category: 'benefits',
          type_id: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          category: 'rental income',
          type_id: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          category: 'other income',
          type_id: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Categories', null, {});
  },
};
