// custom events: add_tracks
SL.Playlist = Backbone.Model.extend({

  urlRoot: function(){
    return SL.current_user.id+'/playlists';
  },

  initialize: function(){
    if(!this.has('id')) this.set({ 'id': SL.uid() });
    this.tracks = new SL.TrackList([],{ playlist: this });
    this.tracks.fetch();
    this.active_track = null;
  },
  
  getTracks: function(){
    return this.tracks;
  },
  
  getActiveTrack: function(){
    if(_.isEmpty(this.active_track)){
      var track = this.getNextTrack();
      this.setActiveTrack(track);
      return track;
    }
    return this.active_track;
  },

  setActiveTrack: function(track){
    if(_.isString(track)) track = this.tracks.get(track);
    if(this.active_track) this.active_track.deactivate();
    this.active_track = track;
    this.active_track.activate();
    this.trigger('change_track',track,this);
  },

  getNextTrack: function(){
    var tracks = this.tracks;
    if(this.length === 0) return null;
    if(_.isEmpty(this.active_track)) return tracks.at(0);
    var next_index = tracks.indexOf(this.active_track) + 1;
    if(next_index < tracks.length) return tracks.at(next_index);
    return tracks.at(0);
  },

  getPrevTrack: function(){
    var tracks = this.tracks;
    if(this.length === 0) return null;
    if(_.isEmpty(this.active_track)) return tracks.at(this.length-1);
    var prev_index = tracks.indexOf(this.active_track) - 1;
    if(prev_index < 0) return tracks.at(this.length-1);
    return tracks.at(prev_index);
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
