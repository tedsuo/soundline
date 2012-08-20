/*
  # Player
  
  Top-level model.  Provides a Collection of Playlists, and an API facade
  for controlling the application. When possible, views use this API instead of
  lower-level models and collections.
  
  Custom events: 
  - set_active
  - select_playlist
  - change_track
  
*/

SL.Player = Backbone.Collection.extend({
  model: SL.Playlist,

  url: function(){
    return SL.current_user.id+'/playlists';
  },
  
  initialize: function(){
    this.on('destroy', this.onDestroy, this);
    this.on('change_track',this.setActive,this);
  },
  
  // destroy a playlist
  destroyByCid: function(cid,o){
    var model = this.getByCid(cid);
    if(model) model.destroy();
  },

  // select a playlist
  // note: this does not automatically make the playlist active
  selectPlaylist: function(id){
    this.selected_playlist = this.get(id);
    this.trigger('select_playlist',this.selected_playlist);
  },

  getSelectedPlaylistId: function(){
    if(this.selected_playlist) return this.selected_playlist.id;
  },

  // activating a playlist causes it to automatically start playing
  setActive: function(track,playlist){
    // get by id if necessary
    if(_.isString(playlist)) playlist = this.get(playlist);
    
    // do nothing if playlist is already active
    if(playlist.cid === this.getActiveCid()) return;
    
    // deactivate the currently running playlist
    if(this.active) this.active.deactivate();
    
    this.active = playlist;
    this.trigger('set_active',playlist);
    
    // update the server
    SL.current_user.save({
      active_playlist_id: this.active.id
    });
  },
  
  // unset the currently running playlist,
  clearActive: function(){
    if(this.active) this.active.deactivate();
    this.active = null;
    this.trigger('set_active',null);
    
    // update the server
    SL.current_user.save({
      active_playlist_id: null
    });
  },
  
  // run when a playlist is deleted
  onDestroy: function(playlist){
    // unset the playlist if we delete it while it is running  
    if(playlist.id == this.getActiveId()) this.clearActive();
    // deselect the playlist
    if(playlist.id == this.getSelectedPlaylistId()) this.selectPlaylist(null);
  },

  getActive: function(){
    return this.active;
  },
  
  getActiveCid: function(){
    if(this.active) return this.active.cid;
  },
  
  getActiveId: function(){
    if(this.active) return this.active.id;
  },
  
  // returns the currently playling track
  getActiveTrack: function(){
    if(this.active) return this.active.getActiveTrack();
  },

  // gets the next track in the playlist
  getNextTrack: function(){
    return this.getActive().getNextTrack();
  },

  // gets the previous track in the playlist
  getPrevTrack: function(){
    return this.getActive().getPrevTrack();
  },

  // sets the currently playing track
  setActiveTrack: function(track){
    this.getActive().setActiveTrack(track) 
  },
  
  // plays the next track
  nextTrack: function(){
    this.setActiveTrack(this.getNextTrack());
  },

  // plays the previous track
  prevTrack: function(){
    this.setActiveTrack(this.getPrevTrack());
  },

  // play/pause the song
  playToggle: function(){
    if(this.getActiveTrack()) this.getActiveTrack().playToggle();
  },

  // play the song
  play: function(){
    if(this.getActiveTrack()) this.getActiveTrack().play();
  },

  // pause the song
  pause: function(){
    if(this.getActiveTrack()) this.getActiveTrack().pause();
  }
});
