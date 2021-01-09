'use strict';
const bcrypt = require('bcrypt')

module.exports = (sequelize, DataTypes) => {
  const lifeCoach = sequelize.define('lifeCoach', {
      id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
    },
    firstName: DataTypes.TEXT,
    lastName: DataTypes.TEXT,
    email: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
     password: {
      type: DataTypes.TEXT,
      allowNull: false,
      set: function setPassword(password) {
        this.setDataValue('password', bcrypt.hashSync(password, bcrypt.genSaltSync(10), null))
      },
       },
       bio: {
      type: DataTypes.TEXT,
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
    clients: {
        type: DataTypes.ARRAY(DataTypes.UUID),
    },
    age: DataTypes.INTEGER
  }, {tableName: 'lifeCoaches',
    underscored: true,
    defaultScope: {
      where: {
        isDeleted: false,
      },
    },
  });
 lifeCoach.prototype.validPassword = function lifeCoach_validPassword(password) {
    return bcrypt.compareSync(password, this.password)
  }
  return lifeCoach;
};