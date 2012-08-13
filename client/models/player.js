SL.Player = Backbone.Model.extend({
  
  initialize: function(o){
    this.playlists = new SL.PlaylistList();
  },

  getPlaylists: function(){
    return this.playlists;
  },
  
  getActivePlaylist: function(){
    return this.playlists.getActive();
  },

  fetch: function(){
    this.playlists.fetch();
  }
});
