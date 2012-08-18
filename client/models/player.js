SL.Player = Backbone.Model.extend({
  
  initialize: function(o){
    this.playlists = o.playlists || new SL.PlaylistList();
  },

  getPlaylists: function(){
    return this.playlists;
  },
  
  getActivePlaylist: function(){
    return this.playlists.getActive();
  },

  getActiveTrack: function(){
    if(this.getActivePlaylist()) return this.getActivePlaylist().getActiveTrack();
    else return new SL.Track();
  }

});
