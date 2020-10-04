exports.App = function(){
//importing express
const express = require('express');
var cors = require('cors')
//importing all defined routes from route file
const route=express.Router();
const routes = require('./route').routers(route);
//importing body parser to parse body of http requests
const bodyParser = require('body-parser');
//Add imports to express in this application
const app=express();
app.use(cors());
app.use(bodyParser.json({limit: '10mb', extended: true}))
app.use(bodyParser.urlencoded({limit: '10mb', extended: true}))
//  Connect all our routes to our application
app.use('/api', routes);

return app;
};
