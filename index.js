const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
const Express = require('express');
const App = Express();
const Genres = require('./Routes/Genres');
const Customers = require('./Routes/Customers');
const Movies = require('./Routes/Movies');
const Rentals = require('./Routes/Rentals');
const Users = require('./Routes/Users');
const Auth = require('./Routes/auth');
const AuthMW = require('./Middleware/auth');
const config = require('config');
const morgan = require('morgan');
const mongoose = require('mongoose');

if(!config.get('jwtPrivateKey'))
{
    console.error('FATAL ERROR: jwtPrivateKey is not defined.');
    process.exit(1);
}



App.use(Express.json());
App.use(Express.urlencoded({ extended: true }));
App.use(morgan('tiny'));
App.use('/api/genres', Genres);
App.use('/api/customers', Customers);
App.use('/api/movies', Movies);
App.use('/api/rentals', Rentals);
App.use('/api/users', Users);
App.use('/api/auth', Auth);
console.log("Application name :" + config.get('name'));
mongoose.connect('moonidly_db', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to Vidly DB'))
    .catch(err => console.log(err.message));

const port = process.env.port || 3000;
App.listen(port);
console.log(`Listening on port 3000....${port}`);