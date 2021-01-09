'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('ChatRooms', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
    })
    return queryInterface.addConstraint("ChatRooms", ["name"], {
      type: "unique",
      name: "unique_name",
    })
  },
  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable('ChatRooms');
  }
};