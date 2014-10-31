/**
 * Created by AHMER on 10/30/2014.
 */
var express    = require('express'); 		// call express
var app        = express(); 				// define our app using express
var bodyParser = require('body-parser');
var config = require('./config');
var mongoose = require('mongoose');
var errorHandler = require('errorhandler');
var logger = require('morgan');
var userfunc = require('./routes/user');




// configure app to use bodyParser()
// this will let us get the data from a POST

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());




/**
 * Connect to MongoDB.
 */
mongoose.connect(config.db);
mongoose.connection.on('open', function () {
    console.log('Mongoose is started');
});
mongoose.connection.on('error', function() {
    console.error('MongoDB Connection Error. Make sure MongoDB is running.');
});




// using require services;
app.use(logger('dev'));
app.use(bodyParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());


//port seting

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router(); 				// get an instance of the express Router

// test route to make sure everything is working (accessed at GET http://localhost:3000/api)
router.get('/', function(req, res) {
    res.end('Helllo world');
    //res.json({ message: 'hooray! welcome to our api!' });
});
router.post('/signUp',userfunc.signUp);


// more routes for our API will happen here
// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api

app.use('/',router);



/**
 * 500 Error Handler.
 */

app.use(errorHandler());
// START THE SERVER
// =============================================================================
app.listen(config.port);
console.log('Magic happens on port ' + config.port);
