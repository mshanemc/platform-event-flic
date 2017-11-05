# platform event inserter

This is a trivial heroku>node>express app that listens for requests and sends a hardcoded platform event to an org.

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy?template=https%3A%2F%2Fgithub.com%2Fmshanemc%2Fplatform-event-flic)

### config vars

* `SFDC_USERNAME` a user who has perms to create the event in some org
* `SFDC_PASSWORD` is your password, and optionally a security token appended to it
* `EVENT_API_NAME` example: Ride_Completed__e
* `EVENT_JSON` example: {"Weather__c":"Snow"}

### requests

send them as GET to `/events`
you can verify the app is up successfully by GET `/`

### security

there absolutely is none.  This was originally built to take advantage of the [flic button](https://flic.io/)'s internet request option--which doesn't support oauth, so that's why there's a heroku app in between

### TODO
allow POST to `/events` and just forward the req body.


