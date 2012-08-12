SL.Playlist = Backbone.Collection.extend({
  urlRoot: function(){
    return '/playlists/'+this.id;
  },

  initialize: function(){
    this.tracks = new SL.TrackList();
  }

});
