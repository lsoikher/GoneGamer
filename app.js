
// =========================
// get the packages we need 
// =========================

var express       = require('express'),
    config        = require('./config'),                        // get our config file;
    env           = process.env.NODE_ENV;
    
var app           = new express(),

    hbs           = require('hbs'),
    path          = require('path'),
    favicon       = require('serve-favicon'),
    morgan        = require('morgan'),
    cookieParser  = require('cookie-parser'),
    bodyParser    = require('body-parser'),

    jwt           = require('jsonwebtoken'),                    // used to create, sign, and verify tokens
    mongoose      = require('mongoose'),                        // used to access mongo db
    Firebase      = require('firebase'),                        // used for chat

    log           = require('debug')('goneGamer:app.js'),
    io            = require('socket.io')({path: '/socket.io'});

app.io            = io;
// module.exports    = io;

// =========================
// configuration ===========
// =========================

mongoose.connect(config.authDatabase); // connect to database
app.set('superSecret', config.secret); // secret variable

// =========================
// application init ========
// =========================

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// Handlebars Partials/Helpers
hbs.registerPartials(__dirname + '/views/partials');
hbs.registerHelper('json', function(context) {return JSON.stringify(context).replace(/"/g,"'"); });
hbs.registerHelper('ifDev', function(options) {if(process.env.NODE_ENV != 'prod') {return options.fn(this); } return options.inverse(this); });
hbs.registerHelper('isset', function (value, safeValue) {
    var out = value || safeValue;
    return new Handlebars.SafeString(out);
});

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Sample Firebase Connection
// var gameChat = new Firebase(config.databases[env].firebase.url);
// gameChat.child('gameNight/naruto/characters/Koma/accuracy').on("value", function(d){
//   console.log(d.val());
// });

// =========================
// Route Set Up ============
// =========================

var route_obj = {'/':'pages', '/auth':'auth', '/api':'api'};
for (var path in route_obj) {
  app.use(config.base_url+path, require('./routes/'+route_obj[path]));
}


// =========================
// Defaults ================
// =========================

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// =========================
// Error Handlers ==========
// =========================

// development error handler
// will print stacktrace
if (app.get('env') !== 'prod') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
