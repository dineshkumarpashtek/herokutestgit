//set up our application

var express  = require('express');
var app      = express();
var port     = process.env.PORT || 8080;
var flash    = require('connect-flash');
        
var morgan       = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');
var session      = require('express-session');

var pgp = require('./server/config/pgpromise.js');  
var db= require('./server/config/database.js') 
console.log('db:'+JSON.stringify(db));
// set up our express application
app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser()); // get information from html forms
app.set('views', './server/views');
app.set('view engine', 'ejs'); // set up ejs for templating
 

app.use(express.static("./public"));

// routes ======================================================================
require('./server/config/routes.js')(app,db,pgp); // load our routes and pass in our app and fully configured passport


// launch ======================================================================
app.listen(port);
console.log('The magic happens on port ' + port);
