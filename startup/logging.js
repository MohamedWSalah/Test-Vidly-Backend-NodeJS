const winston = require('winston');
require('winston-mongodb');
require('express-async-errors');

module.exports = function () {
    winston.exceptions.handle(
        new winston.transports.File({ filename: 'uncaughtExceptions.log' }));

    process.on('unhandledRejection', (ex) => {
        console.log(ex.message);
    });

    winston.configure({
        transports: [new winston.transports.File
            ({ filename: 'error.log', level: 'error' })]
    });

    // winston.configure({transports:[new winston.transports.MongoDB
    //         ({ db:'mongodb://localhost/vidly'}) ]});




}