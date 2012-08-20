/*
  # initializeAccessToken
  
  checks for a stored soundcloud access token and initializes the SC connection with it
  
*/
SL.initializeAccessToken = function(){
  var token = SL.getAccessToken();
  if(_.isEmpty(token)) return false;
  SC.storage().setItem('SC.accessToken', token);
  return true;
}
