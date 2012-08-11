SL.boot = function(){
  // initialize client with app credentials
  SC.initialize({
    client_id: SL.CLIENT_ID,
    redirect_uri: SL.OAUTH_URL 
  });

  $(function(){
    if(SL.initializeAccessToken()){
      SC.get('/me', function(me) { 
        console.log(me);
      });
    }else{
      SL.v.splash = new SL.SplashView({
        el: document.getElementById('sl-container')
      }).render();
    }
  });
};
