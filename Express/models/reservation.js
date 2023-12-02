const {DataTypes} = require('sequelize');
const {sequelize} = require('../database/sequelize');

const Reservation = sequelize.define('reservation',
    {
        id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
        startDate: DataTypes.DATEONLY,
        endDate: DataTypes.DATEONLY,
        userId: DataTypes.INTEGER,
        bnbId:DataTypes.STRING,
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE,
    },
    {
        underscored: true
    },
);

module.exports = Reservation;