var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var stylus = require('stylus');
var console = require('debug');
var dataModel = require('./data-model');
var CheckProcessor = require('./check-processor');

var index = require('./routes/index');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(stylus.middleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/index', index);

app.registerEndpoints = function () {
    app.ws('/ws', function (ws, req) {
        /*
        ws.on('message', function (msg) {
        });
        */
    });

    app.use(function (req, res, next) {
        var err = new Error('Not Found');
        err.status = 404;
        next(err);
    });

    app.use(function (err, req, res, next) {
        // set locals, only providing error in development
        res.locals.message = err.message;
        res.locals.error = req.app.get('env') === 'development' ? err : {};

        // render the error page
        res.status(err.status || 500);
        res.render('error');
    });

    dataModel.addListener(function () {
        var data = dataModel.getData();
        var json = JSON.stringify(data);

        app.expressWs.getWss('/ws').clients.forEach(function (client) {
            client.send(json)
        })
    });
    new CheckProcessor(dataModel).start();
}

module.exports = app;
