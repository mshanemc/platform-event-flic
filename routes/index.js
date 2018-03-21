const express = require('express');
const router = express.Router();
const logger = require('heroku-logger');

const jsforce = require('jsforce');
const conn = new jsforce.Connection();

conn.login(process.env.SFDC_USERNAME, process.env.SFDC_PASSWORD, function (err, res) {
  if (err) {
    console.log(err);
  } else {
    console.log(res);
  }
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Platform Event Generator' });
});

// the original version
router.get('/events', function(req, res){
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

// for the double-click event
router.get('/doubleclick', function (req, res) {
  conn.sobject(process.env.DOUBLECLICK_EVENT_API_NAME).create(JSON.parse(process.env.DOUBLECLICK_JSON), function (err, ret) {
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

// for the press-and-hold event
router.get('/hold', function (req, res) {
  conn.sobject(process.env.HOLD_EVENT_API_NAME).create(JSON.parse(process.env.HOLD_JSON), function (err, ret) {
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

module.exports = router;
