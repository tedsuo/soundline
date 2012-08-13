// custom events: add_tracks
SL.Playlist = Backbone.Model.extend({

  urlRoot: function(){
    return SL.current_user.id+'/playlists';
  },

  initialize: function(){
    if(!this.has('id')) this.set({ 'id': SL.uid() });
    this.tracks = new SL.TrackList([],{ playlist: this, fetch:true });
  },
  
  getTracks: function(){
    return this.tracks;
  },
  
  addTracks: function(items){
    var tracks = this.tracks;
    _.forEach(items,function(item){
      tracks.createFromSoundcloud(item);
    });
    this.trigger('add_tracks');
  },

  addTracksFromUrl: function(url){
    var playlist = this;
    SC.get('/resolve',{url:url},function(results){
      // whatever it is, if it has tracks, we want them
      if(_.isObject(results) && _.isArray(results.tracks)){
        results = results.tracks;
      }

      // kind of assuming the only array-like thing a url resolves too is a track list
      if(_.isArray(results)){
        playlist.addTracks(results);
      } else { 
        playlist.addTracksFromSoundcloudObject(results);
      }
    });
  },

  addTracksFromSoundcloudObject: function(result){
    if(!_.isObject(result)) return;
    switch(result.kind){
      case 'user':
        this.addTracksFromSoundcloudUser(result);
        break;
    }
  },

  addTracksFromSoundcloudUser: function(user){
    var playlist = this;
    var tracks = this.tracks;
    SC.get('/users/'+user.id+'/tracks',function(results){
      playlist.addTracks(results);
    });
  }
});
