const config = require('config');
const Express = require('express');
const App = Express();
//require('./startup/logging')();
require('./startup/routes')(App);
require('./startup/db')();
require('./startup/config')();
require('./startup/validation')();

console.log("Application name :" + config.get('name'));


const port = process.env.PORT || config.get('port');
App.listen(port);
console.log(`Listening on port ${port}`);


