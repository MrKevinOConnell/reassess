'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('Users', {
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    bio: DataTypes.TEXT,
    email: DataTypes.TEXT,
    password: DataTypes.TEXT
  }, {
    tableName: 'reassess',
    underscored: true,
    defaultScope: {
      where: {
        isDeleted: false,
      },
    },
  });
  User.prototype.validPassword = function User_validPassword(password) {
    return bcrypt.compareSync(password, this.password)
  }
  return User;
};