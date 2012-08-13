SL.Playlist = Backbone.Model.extend({

  initialize: function(){
    this.tracks = new SL.TrackList();
  }

});
