// is it really called that? yes. yes it is.
// Custom events: set_active
SL.PlaylistList = Backbone.Collection.extend({
  model: SL.Playlist,

  url: function(){
    return SL.current_user.id+'/playlists';
  },
  
  initialize: function(){
    this.on('destroy', function(playlist){
      if(playlist.cid == this.getActiveCid()) this.clearActive();
    });
    this.on('change_track',this.setActive,this);
  },

  destroyByCid: function(cid,o){
    var model = this.getByCid(cid);
    if(model) model.destroy();
  },

  selectPlaylist: function(cid){
    this.selected_playlist = this.getByCid(cid);
    this.trigger('select_playlist',this.selected_playlist);
  },

  getSelectedPlaylistCid: function(){
    if(this.selected_playlist) return this.selected_playlist.cid;
  },

  setActive: function(track,playlist){
    if(playlist.cid !== this.getActiveCid()){
      this.active = playlist;
      this.trigger('set_active',playlist);
    }
  },
  
  clearActive: function(){
    this.active = null;
    this.trigger('set_active');
  },

  getActive: function(){
    return this.active;
  },
  
  getActiveCid: function(){
    if(this.active) return this.active.cid;
  },

  getActiveTrack: function(){
    if(this.active) return this.active.getActiveTrack();
  },

  getNextTrack: function(){
    return this.getActive().getNextTrack();
  },

  getPrevTrack: function(){
    return this.getActive().getPrevTrack();
  },

  setActiveTrack: function(track){
    this.getActive().setActiveTrack(track) 
  },

  nextTrack: function(){
    this.setActiveTrack(this.getNextTrack());
  },

  prevTrack: function(){
    this.setActiveTrack(this.getPrevTrack());
  },

  playToggle: function(){
    if(this.getActiveTrack()) this.getActiveTrack().playToggle();
  },

  play: function(){
    if(this.getActiveTrack()) this.getActiveTrack().play();
  },

  pause: function(){
    if(this.getActiveTrack()) this.getActiveTrack().pause();
  }
});
