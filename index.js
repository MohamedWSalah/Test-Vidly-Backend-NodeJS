const Express = require('express');
const App = Express();
const GenresX = require('./Routes/Genres');
const Logger = require('./Middleware/Logger');
const config = require('config');
const morgan = require('morgan');
const mongoose = require('mongoose');


App.use(Logger);
App.use(Express.json());
App.use(Express.urlencoded({ extended: true}));
App.use(morgan('tiny'));
App.use('/api/Genres' , GenresX);


console.log("Application name :" + config.get('name'));
mongoose.connect('mongodb://localhost/vidly',{ useNewUrlParser: true, useUnifiedTopology:true })
.then(()=> console.log('Connected to Vidly DB'))
.catch(err => console.log(err.message));

App.listen(3000);
console.log("Listening on port 3000....");