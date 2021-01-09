'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('lifeCoaches', {
       id: {
        type: Sequelize.UUID,
        primaryKey: true,
      },
      first_name: {
        type: Sequelize.TEXT,
      },
      last_name: {
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
       clients: {
        type: Sequelize.ARRAY(Sequelize.UUID),
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
     await queryInterface.addConstraint('lifeCoaches', [ 'email' ], {
      type: 'UNIQUE',
      name: 'UK__lifeCoaches_email',
    })
  },
  
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('lifeCoaches');
  },
}