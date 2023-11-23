//-----------------------------------------------
//    Environment variables
//-----------------------------------------------

const env = require('dotenv');
env.config();

//-----------------------------------------------
//    Imports
//-----------------------------------------------

const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const authRouter = require('./routes/auth');

//-----------------------------------------------
//    MongoDB connection
//-----------------------------------------------
const mongoCredentials = {
    host: process.env.DB_HOST_MONGO ?? '127.0.0.1',
    port: process.env.DB_PORT_MONGO ?? '27017',
    user: process.env.DB_USERNAME_MONGO ?? '',
    password: process.env.DB_PASSWORD_MONGO ?? '',
    database: process.env.DB_DATABASE_MONGO ?? '',
};

mongoose.connect(`mongodb://${mongoCredentials.user}:${mongoCredentials.password}@${mongoCredentials.host}:${mongoCredentials.port}/${mongoCredentials.database}`);
const mongoConnection = mongoose.connection;

mongoConnection.on('error', console.error.bind(console, 'MongoDB connection error'));
mongoConnection.once('open', () => {
    console.log('Successfully connected to MongoDB');
});

//-----------------------------------------------
//    JWT authorization
//-----------------------------------------------

function generateAccessToken(username) {
    return jwt.sign(username, process.env.TOKEN_SECRET, {expiresIn: '3600s'});
}

//-----------------------------------------------
//    App Startup
//-----------------------------------------------
const app = express();

app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.get('/', (req, res) => {
    res.send('This route is working');
});
app.use('/api/auth', authRouter);

app.listen(5000, () => console.log(`Server is running at port: 5000`));
