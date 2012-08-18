SL.PlayerView = Backbone.View.extend({
  
  events: {
  },
  
  initialize: function(o){
    this.player = this.model || o.player;
    this.playlists = this.player.getPlaylists();
    this.playlists.on('set_active',this.showTracks,this);
    
    this.playlists_view = new SL.PlaylistListView({
      playlists: this.playlists
    });
    this.tracks_view = new SL.TracklistView({
      playlist: this.playlists.getActive() 
    });
    this.controls_view = new SL.ControlsView({
      playlists: this.playlists
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
  
  showTracks: function(){
    this.tracks_view.setPlaylist(this.playlists.getActive());
  }
});
