'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'Tags',
      [
        {
          tag: 'car',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          tag: 'costco',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          tag: 'lcbo',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          tag: 'food basics',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          tag: 'mac',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          tag: 'kids',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          tag: 'food',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          tag: 'education',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          tag: 'pharmacy',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          tag: 'doctors',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          tag: 'internet',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          tag: 'phone',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          tag: 'utilities',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          tag: 'condo fee',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          tag: 'mortgage',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          tag: 'household',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          tag: 'fee',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          tag: 'dentist',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Tags', null, {});
  },
};
