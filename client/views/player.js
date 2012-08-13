SL.PlayerView = Backbone.View.extend({
  
  events: {
  },
  
  initialize: function(o){
    this.playlists = this.model.getPlaylists();
    this.playlists.on('set_active',this.showTracks,this);
    
    this.playlists_view = new SL.PlaylistListView({
      playlists: this.playlists
    });
    this.tracks_view = new SL.TracklistView({
      playlist: this.playlists.getActive() 
    });
  },

  render: function(){
    this.$el.html(SL.t.player());
    this.playlists_view.setElement(document.getElementById('sidebar'));
    this.playlists_view.render();
    this.tracks_view.setElement(document.getElementById('main'));
    this.tracks_view.render();
    return this;
  },
  
  showTracks: function(){
    this.tracks_view.setPlaylist(this.playlists.getActive());
  }
});
