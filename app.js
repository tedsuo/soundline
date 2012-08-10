// Dependencies
var express = require('express');
var stitchit = require('stitchit');

// Constants
var PORT = process.env.PORT || 5000;
var PUBLIC_DIR = __dirname + '/client';
var TEMPLATE_PATH = PUBLIC_DIR + '/templates/';
var TEMPLATE_NAMESPACE = 'SL.template';

// SoundLine http server
app = express();
process.nextTick(function(){
  app.listen(PORT);
  console.log('SoundLine server started on port '+PORT);
});

// serve up all the static files, no minification or gzipping
app.use(express.static(PUBLIC_DIR));

// compile all client side templates into a single namespace
app.get('/templates',function(req,res){
  stitchit({path:TEMPLATE_PATH, namespace:TEMPLATE_NAMESPACE},function(err,templates){
    if(err) throw err;
    res.send(templates);
  });
});
