/*
  # getAccessToken
  
  gets a soundcloud access token from wherever we are storing in between page refreshes.
  
*/
SL.getAccessToken = function(){
  return unescape(document.cookie.replace(new RegExp("(?:^|.*;\\s*)" + escape(SL.ACCESS_COOKIE).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=\\s*((?:[^;](?!;))*[^;]?).*"), "$1"));
};
