SL.boot = function(){
  // initialize soundcloud client with app credentials
  SC.initialize({
    client_id: SL.CLIENT_ID,
    redirect_uri: SL.OAUTH_URL 
  });

  // store the element we hang our top-level views off of
  SL.root_element = document.getElementById('sl-container');

  // current_user is a singleton which is assumed to exist 
  // and is referenced directly by the rest of the codebase
  SL.current_user = new SL.User();

  // once the user is setup, show the media player 
  SL.current_user.on('initialized', function(o){
    // setup playlists
    SL.player = new SL.Player();
    SL.player.fetch({
      // load whatever the last thing the user was listning to
      success: function(){
        if(_.isEmpty(SL.current_user.get('active_playlist_id'))) return;
        var p = SL.player.get(SL.current_user.get('active_playlist_id'));
        var track_id = SL.current_user.get('active_track_id');
        
        SL.player.setActive(null, p);
        SL.player.selectPlaylist(p);

        if(_.isEmpty(track_id)) return;
        p.on('add_tracks',_.once(function(){
          p.setActiveTrack(SL.current_user.get('active_track_id'));
          SL.player.pause(); 
        })); 
      }
    });

    // setup music player
    SL.player_view = new SL.PlayerView({
      el: SL.root_element,
      model: SL.player
    }).render();
  });

  // on load, start the app, or show the login screen
  $(function(){
    if(SL.current_user.isLoggedIn()){
      SL.current_user.initializeFromSoundClound();
    }else{
      SL.splash_view = new SL.SplashView({
        el: SL.root_element 
      }).render();
    }
  });
};
