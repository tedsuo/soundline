SL.boot = function(){
  // initialize soundcloud client with app credentials
  SC.initialize({
    client_id: SL.CLIENT_ID,
    redirect_uri: SL.OAUTH_URL 
  });
 
  // create models
  SL.current_user = new SL.User();
  
  // create views
  SL.splash_view = new SL.SplashView({
    el: document.getElementById('sl-container')
  })
 
  // start the app, or show the login screen
  $(function(){
    if(SL.current_user.isLoggedIn()){
      SL.current_user.initializeFromSoundClound();
    }else{
      SL.splash_view.render();
    }
  });
};
