// is it really called that? yes. yes it is.
SL.PlaylistList = Backbone.Collection.extend({
  model: SL.Playlist,

  url: function(){
    return SL.current_user.id+'/playlists';
  },

});
