// BuffBody: the world's simplest connect middleware.
// Buffer the body of a request as a string, don't parse it, 
// attach it as req.buffBody
module.exports = function(req,res,next){
  var data = '';

  var onData = function(chunk){
    data += chunk;
  };
  var onEnd = function(){
    req.removeListener('data',onData);
    req.removeListener('close',onClose);
    req.buffBody = data;
    next();
  };
  var onClose = function(){
    req.removeListener('data',onData);
    req.removeListener('end',onEnd);
    res.end('',500);
  };

  req.setEncoding('utf8');
  req.on('data',onData);
  req.once('end',onEnd);
  req.once('close',onClose);
}

