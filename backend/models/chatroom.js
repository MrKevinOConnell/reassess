'use strict';
module.exports = (sequelize, DataTypes) => {
  const ChatRoom = sequelize.define('ChatRoom', {
     id: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
    },
     messages: {
        type: DataTypes.ARRAY(DataTypes.JSON)
      },
       isDeleted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    isDeleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  }, {tableName: 'ChatRooms',
    underscored: true,
    defaultScope: {
      where: {
        isDeleted: false,
      },
    },});
  ChatRoom.associate = function(models) {
    // associations can be defined here
  };
  return ChatRoom;
};