// is it really called that? yes. yes it is.
SL.PlaylistList = Backbone.Collection.extend({
  model: SL.Playlist,

  urlRoot: function(){
    return '/playlists/'+this.id;
  }

});
