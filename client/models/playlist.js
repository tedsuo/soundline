SL.Playlist = Backbone.Model.extend({

  initialize: function(){
    if(!this.has('id')) this.set({ 'id': SL.uid() });
    this.tracks = new SL.TrackList();
  }

});
