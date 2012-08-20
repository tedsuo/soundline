/*
  # Player
  
  Top level view.  Generates all necessary display code to run SoundLine.
  
  ## Model Access
  - Player
  
*/
SL.PlayerView = Backbone.View.extend({
  
  events: {
    'click #logout-btn': 'logout'
  },
  
  initialize: function(o){
    this.player = this.model || o.player;
    
    // create sub-views
    this.playlists_view = new SL.PlaylistListView({
      player: this.player
    });
    this.tracks_view = new SL.TracklistView({
      player: this.player.getActive() 
    });
    this.controls_view = new SL.ControlsView({
      player: this.player
    });
    
    this.player.on('select_playlist',this.showTracks,this);
  },

  render: function(){
    // render EVERYTHING
    this.$el.html(SL.t.player());
    this.playlists_view
      .setElement(document.getElementById('sidebar'))
      .render();
    this.tracks_view
      .setElement(document.getElementById('main'))
      .render();
    this.controls_view
      .setElement(document.getElementById('current-track'))
      .render();
    return this;
  },

  logout: function(){
    SL.current_user.logout();
  },
  
  // change track display
  showTracks: function(playlist){
    this.tracks_view.setPlaylist(playlist);
  }
});
