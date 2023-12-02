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
const authRouter = require('./routes/authRoutes');
const userRouter = require('./routes/userRoutes');
const bnbRouter = require('./routes/bnbRoutes');
const reservationRouter = require('./routes/reservationRoutes');
const {validationResult} = require("express-validator");
const {userCreateValidation} = require("./middleware/validator/userCreateValidator");

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
//    App Startup
//-----------------------------------------------

process
    .on('unhandledRejection', (reason, p) => {
        console.error(reason, 'Unhandled Rejection at Promise', p);
    })
    .on('uncaughtException', err => {
        console.error(err, 'Uncaught Exception thrown');
        process.exit(1);
    });

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.post(
    '/',
    [
        userCreateValidation,
    ],
    (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({errors: errors.array()});
        }

        const {email, password} = req.body;

        // Your logic here...
        res.status(200).json({message: 'Request validated successfully', data: {email, password}});
    }
);

app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);
app.use('/api/bnb', bnbRouter);
app.use('/api/reservation', reservationRouter);

app.listen(5000, () => console.log(`Server is running at port: 5000`));
