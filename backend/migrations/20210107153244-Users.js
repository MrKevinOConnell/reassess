'use strict';

const { sequelize } = require("../models");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Users', {
       id: {
        type: Sequelize.UUID,
        primaryKey: true,
      },
      first_name: {
        type: Sequelize.TEXT,
      },
      short_term_goal: {
      type: Sequelize.TEXT,
      },
       mid_term_goal: {
      type: Sequelize.TEXT,
      },
      long_term_goal: {
      type: Sequelize.TEXT,
      },
      bio: {
        type: Sequelize.TEXT,
      },
      email: {
        type: Sequelize.TEXT,
      },
      password: {
        type: Sequelize.TEXT,
      },
       age: {
        type: Sequelize.INTEGER,
      },
       life_coach: {
        type: Sequelize.UUID,
    },
      is_deleted: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    })
     await queryInterface.addConstraint('Users', [ 'email' ], {
      type: 'UNIQUE',
      name: 'UK__users_email',
    })
  },
  
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Users');
  },
}
