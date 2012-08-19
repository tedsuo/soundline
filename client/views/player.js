SL.PlayerView = Backbone.View.extend({
  
  events: {
  },
  
  initialize: function(o){
    this.player = this.model || o.player;
    this.player.on('select_playlist',this.showTracks,this);
    
    this.playlists_view = new SL.PlaylistListView({
      player: this.player
    });
    this.tracks_view = new SL.TracklistView({
      player: this.player.getActive() 
    });
    this.controls_view = new SL.ControlsView({
      player: this.player
    });
    
  },

  render: function(){
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
  
  showTracks: function(playlist){
    this.tracks_view.setPlaylist(playlist);
  }
});
