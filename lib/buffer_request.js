module.exports = function(req,cb){
  var data = '';

  var onData = function(chunk){
    data += chunk;
  };
  var onEnd = function(){
    req.removeListener('data',onData);
    req.removeListener('close',onClose);
    cb(null,data);
  };
  var onClose = function(){
    req.removeListener('data',onData);
    req.removeListener('end',onEnd);
    cb(new Error('Connection closed improperly'));
  };

  req.setEncoding('utf8');
  req.on('data',onData);
  req.once('end',onEnd);
  req.once('close',onClose);
}

