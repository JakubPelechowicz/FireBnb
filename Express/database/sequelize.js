const {Sequelize} = require("sequelize");

const mariadbCredentials = {
    host: process.env.DB_HOST_MYSQL ?? '127.0.0.1',
    port: parseInt(process.env.DB_PORT_MYSQL) ?? 3306,
    user: process.env.DB_USERNAME_MYSQL ?? '',
    password: process.env.DB_PASSWORD_MYSQL ?? '',
    database: process.env.DB_DATABASE_MYSQL ?? '',
};

const sequelize = new Sequelize(mariadbCredentials.database, mariadbCredentials.user, mariadbCredentials.password, {
    host: mariadbCredentials.host,
    port: mariadbCredentials.port,
    dialect: 'mariadb',
});

sequelize.authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(error => {
        console.error('Unable to connect to the database:', error);
    });

module.exports = {sequelize};