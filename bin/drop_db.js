var Mongolian = require('mongolian');
var mongo_connection = new Mongolian();
var db = mongo_connection.db('soundline');
// my drops be crazy 
db.dropDatabase(function(){
  console.log('deleted all the things.')
  process.exit();
});
