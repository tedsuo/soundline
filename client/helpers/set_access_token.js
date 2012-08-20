/*
  # setAccessToken
  
  saves a soundcloud access token between page refreshes.
  
*/
SL.setAccessToken = function(token){
  if(_.isEmpty(token)) token = '';
  document.cookie = SL.ACCESS_COOKIE + '=' + escape(token); 
}
