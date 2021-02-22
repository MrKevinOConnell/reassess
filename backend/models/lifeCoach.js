'use strict';
const bcrypt = require('bcrypt')

module.exports = (sequelize, DataTypes) => {
  const lifeCoach = sequelize.define('LifeCoach', {
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
    category: {
   type: DataTypes.TEXT,
   allowNull: false,
    },
    clients: {
        type: DataTypes.ARRAY(DataTypes.JSON),
        defaultValue: [],
    },
    age: DataTypes.INTEGER
  }, {tableName: 'LifeCoaches',
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