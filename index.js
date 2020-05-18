const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
const Express = require('express');
const App = Express();
const Genres = require('./Routes/Genres');
const Customers = require('./Routes/Customers');
const Movies = require('./Routes/Movies');
const Rentals = require('./Routes/Rentals');
const Users = require('./Routes/Users');
//const Logger = require('./Middleware/Logger');
const config = require('config');
const morgan = require('morgan');
const mongoose = require('mongoose');


//App.use(Logger);
App.use(Express.json());
App.use(Express.urlencoded({ extended: true}));
App.use(morgan('tiny'));
App.use('/api/genres' , Genres);
App.use('/api/customers', Customers);
App.use('/api/movies', Movies);
App.use('/api/rentals', Rentals);
App.use('/api/users', Users);

console.log("Application name :" + config.get('name'));
mongoose.connect('mongodb://localhost/vidly',{ useNewUrlParser: true, useUnifiedTopology:true })
.then(()=> console.log('Connected to Vidly DB'))
.catch(err => console.log(err.message));

App.listen(3000);
console.log("Listening on port 3000....");