SL.initializeAccessToken = function(){
  var token = SL.getAccessToken();
  if(_.isEmpty(token)) return false;
  SC.storage().setItem('SC.accessToken', token);
  return true;
}
