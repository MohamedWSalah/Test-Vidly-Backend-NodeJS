const Genres = require('../Routes/Genres');
const Customers = require('../Routes/Customers');
const Movies = require('../Routes/Movies');
const Rentals = require('../Routes/Rentals');
const Users = require('../Routes/Users');
const Auth = require('../Routes/auth');

const morgan = require('morgan');

const error = require('../Middleware/error');

const Express = require('express');


module.exports = function (App) 
{
    App.use(Express.json());
    App.use(Express.urlencoded({ extended: true }));
    App.use(morgan('tiny'));
    App.use('/api/genres', Genres);
    App.use('/api/customers', Customers);
    App.use('/api/movies', Movies);
    App.use('/api/rentals', Rentals);
    App.use('/api/users', Users);
    App.use('/api/auth', Auth);
    App.use(error);
}