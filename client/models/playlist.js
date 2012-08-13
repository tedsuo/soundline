SL.Playlist = Backbone.Model.extend({

  urlRoot: function(){
    return SL.current_user.id+'/playlists';
  },

  initialize: function(){
    if(!this.has('id')) this.set({ 'id': SL.uid() });
    this.tracks = new SL.TrackList();
  }

});
