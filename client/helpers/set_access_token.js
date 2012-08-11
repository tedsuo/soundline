SL.setAccessToken = function(token){
  if(_.isEmpty(token)) token = '';
  document.cookie = SL.ACCESS_COOKIE + '=' + escape(token); 
}
