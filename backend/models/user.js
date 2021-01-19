'use strict';
const bcrypt = require('bcrypt')

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
      id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
    },
    firstName: DataTypes.TEXT,
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
    lifeCoach: {
        type: DataTypes.UUID,
    },
    age: { type:DataTypes.INTEGER }
  }, {tableName: 'Users',
    underscored: true,
    defaultScope: {
      where: {
        isDeleted: false,
      },
    },
  });
 User.prototype.validPassword = function Users_validPassword(password) {
    return bcrypt.compareSync(password, this.password)
  }
  return User;
};