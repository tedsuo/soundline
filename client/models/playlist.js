SL.Playlist = Backbone.Model.extend({
  urlRoot: function(){
    return SL.current_user.id+'/playlists';
  },

  initialize: function(){
    this.tracks = new SL.TrackList();
  }

});
