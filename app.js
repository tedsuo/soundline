/*
 * DEPENDENCIES
 */
var express = require('express');
var stitchit = require('stitchit');
var redis = require('redis');
var bufferRequest = require('./lib/buffer_request');

/*
 * CONSTANTS
 */
var PORT = process.env.PORT || 80;
var PUBLIC_DIR = __dirname + '/client';
var TEMPLATE_PATH = PUBLIC_DIR + '/templates/';
var TEMPLATE_NAMESPACE = 'SL.t';


/*
 * SETUP
 */

// redis connection
var db, redis_config;
if (process.env.REDISTOGO_URL) {
  redis_config = require("url").parse(process.env.REDISTOGO_URL);
  db = redis.createClient(redis_config.port, redis_config.hostname);
  db.auth(redis_config.auth.split(":")[1]);
} else { 
  db = redis.createClient();
}

// http server
app = express();
// serve up all the static files, no minification or gzipping
app.use(express.static(PUBLIC_DIR));
// start listening once everything is set up
process.nextTick(function(){
  app.listen(PORT);
  console.log('SoundLine server started on port '+PORT);
});


/*
 * ROUTES
 */

// compile all client side templates into a single namespace
app.get('/templates',function(req,res){
  stitchit({path:TEMPLATE_PATH, namespace:TEMPLATE_NAMESPACE},function(err,templates){
    if(err) throw err;
    res.send(templates);
  });
});

// oauth2 response handler
app.get('/oauth',function(req,res){
  res.send('<script src="//connect.soundcloud.com/sdk.js"></script>');
});
