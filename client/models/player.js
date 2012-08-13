SL.Player = Backbone.Model.extend({
  
  initialize: function(o){
    this.playlists = new SL.PlaylistList();
  },

  getPlaylists: function(){
    return this.playlists;
  },
  
  fetch: function(){
    this.playlists.fetch();
  }
});
