const {DataTypes} = require('sequelize');
const {sequelize} = require('../database/sequelize');

const User = sequelize.define('user',
    {
        id: {type: DataTypes.INTEGER, primaryKey: true},
        fullName: DataTypes.STRING,
        password: DataTypes.STRING,
        email: DataTypes.STRING,
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE,
    },
    {underscored: true}
);

module.exports = User;