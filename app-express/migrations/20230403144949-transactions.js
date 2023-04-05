'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
      await queryInterface.createTable('Accounts', {
        account_id: {
        type: Sequelize.UUID ,
        primaryKey:true
      },
      balance :{
        type: Sequelize.INTEGER,
        defaultValue: 0

      },
      createdAt :Sequelize.DATE,
      updatedAt :Sequelize.DATE,
      deletedAt :Sequelize.DATE,
      });

      await queryInterface.createTable('Transactions', {
        transaction_id: {
          type: Sequelize.UUID ,
          primaryKey:true
        },
        account_id: {
        type: Sequelize.UUID
      },
      amount:{
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      createdAt :Sequelize.DATE,
      updatedAt :Sequelize.DATE,
      deletedAt :Sequelize.DATE,
      });

  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('Transactions');
     await queryInterface.dropTable('Accounts');

  }
};
