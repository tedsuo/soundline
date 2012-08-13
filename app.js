/*
 * DEPENDENCIES
 */
var _ = require('underscore');
var express = require('express');
var stitchit = require('stitchit');
var Mongolian = require('mongolian');
var bufferRequest = require('./lib/buffer_request');

/*
 * CONSTANTS
 */
var PORT = process.env.PORT || 80;
var PUBLIC_DIR = __dirname + '/client';
var TEMPLATE_PATH = PUBLIC_DIR + '/templates/';
var TEMPLATE_NAMESPACE = 'SL.t';
var MONGO_URL = process.env.MONGOLAB_URI || 'localhost'

/*
 * SETUP
 */

// db connection
var mongo_connection = new Mongolian(MONGO_URL);
var db = mongo_connection.db('soundline'); 
var users = db.collection('users');
var playlists = db.collection('playlists');

// http server
var app = express();
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

// USERS 

app.put('/users/:id',function(req,res){
  bufferRequest(req,function(err,data){
    if(err) return res.send(500,err.toString());
    var user_data = {id:req.params.id, json:data};
    users.update({id:user_data.id},user_data,true,function(err){
      if(err) return res.send(500,err.toString());
      res.end('',200); 
    });
  });
});

app.get('/users/:id',function(req,res){
  users.findOne({id:req.params.id},function(err,user){
    if(err) return res.send(500,err.toString());
    if(_.isEmpty(user)) return res.send(404);
    res.set('Content-Type','application/json');
    res.set('Content-Length',user.json.length);
    res.send(user.json);
  });
});

// PLAYLISTS

app.put('/:user_id/playlists/:id',function(req,res){
  bufferRequest(req,function(err,data){
    if(err) return res.send(500,err.toString());
    var playlist = {
      id: req.params.id,
      user_id:req.params.user_id, 
      json:data
    };
    playlists.update({id:playlist.id},playlist,true,function(err){
      if(err) return res.send(500,err.toString());
      res.end('',200); 
    });
  });
});

app.get('/:user_id/playlists',function(req,res){
  var user_id = req.params.user_id;
  var response = [];
  playlists
    .find({user_id:user_id})
    .forEach(function(playlist){
      response.push(playlist.json);
    },function(err){
      if(err) return res.send(500,err.toString());
      var json = '['+response.join(',')+']'
      res.set('Content-Type','application/json');
      res.set('Content-Length',json.length);
      res.send(json);
    });
});

app.delete('/:user_id/playlists/:id',function(req,res){
  var playlist = {
    id: req.params.id,
    user_id:req.params.user_id, 
  };
  playlists.remove(playlist,function(err){
    if(err) return res.send(500,err.toString());
    res.end('',200); 
  });
});


