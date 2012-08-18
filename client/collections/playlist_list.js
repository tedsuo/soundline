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
  },
  destroyByCid: function(cid,o){
    var model = this.getByCid(cid);
    if(model) model.destroy();
  },

  setActive: function(cid){
    var p = this.getByCid(cid);
    if(p && (p.cid !== this.getActiveCid())){
      this.active = p;
      this.trigger('set_active');
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
    else return new SL.Track();
  }
});
