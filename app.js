var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
const logger = require('heroku-logger');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
const jsforce = require('jsforce');
const conn = new jsforce.Connection();

conn.login(process.env.SFDC_USERNAME, process.env.SFDC_PASSWORD, function (err, res) {
  if (err) {
    return console.log(err);
  } else {
    return console.log(res);
  }
});


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

/* GET home page. */
app.get('/', function (req, res, next) {
  res.render('index', { title: 'Platform Event Generator' });
});

// post an empty body the the /events endpoint.  Event is defined in config properties
app.get('/events', function (req, res, next) {
  conn.sobject(process.env.EVENT_API_NAME).create(JSON.parse(process.env.EVENT_JSON), function (err, ret) {
    if (err) {
      return logger.error(err);
      res.send(err);
    } else if (!ret.success) {
      return logger.error(ret);
      res.send(ret);
    } else {
      res.send(ret);
    }
  });
})



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// module.exports = app;

const port = process.env.PORT || 8443;

app.listen(port, () => {
  logger.info(`Example app listening on port ${port}!`);
});