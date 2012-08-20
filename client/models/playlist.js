/* 
  # Playlist
   
  The main model.  Each playlist has a list of tracks, an active_track, and methods for adding tracks from soundcloud
  
  ## Custom Events
  - add_tracks
  - change_track
  - remove_track
  
*/

SL.Playlist = Backbone.Model.extend({

  urlRoot: function(){
    return SL.current_user.id+'/playlists';
  },

  initialize: function(){
    // id's are created client-side
    if(!this.has('id')) this.set({ 'id': SL.uid() });
    
    // fetch tracks immediately    
    this.tracks = new SL.TrackList([],{ playlist: this });
    this.tracks.on('reset',this.addTracks,this);
    this.tracks.fetch();
    
    this.active_track = null;
  },
  
  // deletes a track from the track collection
  removeTrack: function(id){
    var track = this.tracks.get(id);
    if(!track) return;
    
    // stop playing the track if we are currently listening to it
    if(track.isActive()){
      this.setActiveTrack(this.getNextTrack())
    }
    
    track.destroy();
    this.trigger('remove_track');
  },

  getTracks: function(){
    return this.tracks;
  },

  // triggered when we move on to another playlist
  deactivate: function(){
    if(this.active_track) this.active_track.deactivate();
  },

  // get the track that is currently playing
  getActiveTrack: function(){
    if(_.isEmpty(this.active_track)){
      var track = this.getNextTrack();
      this.setActiveTrack(track);
      return track;
    }
    return this.active_track;
  },

  // set the track that is currently playing
  setActiveTrack: function(track){
    if(_.isString(track)) track = this.tracks.get(track);
    
    // if we are currently playing a track, deactivate it
    if(this.active_track) this.active_track.deactivate();
    
    this.active_track = track;
    this.active_track.activate();
    
    // update the server
    SL.current_user.save({active_track_id:this.active_track.id});
    
    this.trigger('change_track',track,this);
  },

  // returns the next track in the playlist
  getNextTrack: function(){
    var tracks = this.tracks;
    if(this.length === 0) return null;
    if(_.isEmpty(this.active_track)) return tracks.at(0);
    var next_index = tracks.indexOf(this.active_track) + 1;
    if(next_index < tracks.length) return tracks.at(next_index);
    return tracks.at(0);
  },

  // returns the previous track in the playlist
  getPrevTrack: function(){
    var tracks = this.tracks;
    if(this.length === 0) return null;
    if(_.isEmpty(this.active_track)) return tracks.at(this.length-1);
    var prev_index = tracks.indexOf(this.active_track) - 1;
    if(prev_index < 0) return tracks.at(this.length-1);
    return tracks.at(prev_index);
  },

  // add tracks from soundcloud
  // note: this is used internally, addTracksFromUrl is the suggested method
  addTracks: function(items){
    var tracks = this.tracks;
    _.forEach(items,function(item){
      tracks.createFromSoundcloud(item);
    });
    this.trigger('add_tracks');
  },

  // resolve a soundcloud url into a set of tracks
  // note: currently this only fetches up to 50 tracks
  addTracksFromUrl: function(url){
    var playlist = this;
    
    // SC can't resolve /you endpoints, but we know what to do
    if(url.match('/you/tracks')) return this.addTracksFromSoundcloudUser(SL.current_user);
    if(url.match('/you/favorites')) return this.addFavoritesFromSoundcloudUser(SL.current_user);

    SC.get('/resolve',{url:url},function(results){
      playlist.addTracksFromSoundcloudObject(results);
    });
  },

  // inspect a result from soundcloud, convert it into a set of tracks
  addTracksFromSoundcloudObject: function(result){
    if(!_.isObject(result)) return;
    
    // whatever it is, if it has tracks, we want them
    if(_.isArray(result.tracks)) return this.addTracks(result.tracks);
    
    // beligerently assuming the only array-like thing a url resolves too is a track list
    if(_.isArray(result)) return this.addTracks(result);

    // check if it's a track 
    if(result.kind === 'track') return this.addTracks([result]);

    // check if it's a user object
    if(result.kind === 'user') return this.addTracksFromSoundcloudUser(result);
    
    // check if it's a group object
    if(result.kind === 'group') return this.addTracksFromSoundcloudGroup(result);
  },

  // fetch all of a user's tracks from soundcloud
  addTracksFromSoundcloudUser: function(user){
    var playlist = this;
    var tracks = this.tracks;
    SC.get('/users/'+user.id+'/tracks',function(results){
      playlist.addTracks(results);
    });
  },
  
  // fetch all of a user's favorited tracks from soundcloud
  addFavoritesFromSoundcloudUser: function(user){
    var playlist = this;
    var tracks = this.tracks;
    SC.get('/users/'+user.id+'/favorites',function(results){
      playlist.addTracks(results);
    });
  },

  // fetch all of a groups's tracks from soundcloud
  addTracksFromSoundcloudGroup: function(group){
    var playlist = this;
    var tracks = this.tracks;
    SC.get('/groups/'+group.id+'/tracks',function(results){
      playlist.addTracks(results);
    });
  }
});
