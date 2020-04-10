const Express = require('express');
const App = Express();
const GenresX = require('./Routes/Genres');

App.use(Express.json());
App.use(Express.urlencoded({ extended: true}));

App.use('/api/Genres' , GenresX);

App.listen(3000);
console.log("Listening on port 3000....");