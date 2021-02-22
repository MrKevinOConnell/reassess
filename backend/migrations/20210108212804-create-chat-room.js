'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('ChatRooms', {
      id: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      messages: {
        type: Sequelize.ARRAY(Sequelize.JSON)
      },
      is_deleted: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
    })
  },
  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable('ChatRooms');
  }
};