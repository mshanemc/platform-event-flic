const express = require('express');
const router = express.Router();
const logger = require('heroku-logger');

const jsforce = require('jsforce');
const conn = new jsforce.Connection();

conn.login(process.env.SFDC_USERNAME, process.env.SFDC_PASSWORD, function (err, res) {
  if (err) {
    logger.error(err);
  } else {
    logger.debug(res);
  }
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Platform Event Generator' });
});

// post an empty body the the /events endpoint.  Event is defined in config properties
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

module.exports = router;
