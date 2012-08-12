SL.TrackList = Backbone.Collection.extend({
  model: SL.Track,

  urlRoot: function(){
    return '/playlists/'+this.id;
  }

});
