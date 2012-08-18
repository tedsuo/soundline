SL.TrackList = Backbone.Collection.extend({
  model: SL.Track,

  url: function(){
    return this.playlist.id+'/tracks';
  },

  initialize: function(m,o){
    this.playlist = o.playlist;
  },
 
  createFromSoundcloud:function(item,options){
    if(!_.isObject(item) || item.kind !== 'track') return;
    this.create({
      playlist_id: this.playlist.id,
      sc_id: item.id,
      title: item.title,
      duration: item.duration,
      permalink_url: item.permalink_url,
      stream_url: item.stream_url,
      username: item.user.username,
      user_url: item.user.permalink_url,
      user_id: item.user_id
    },options);
  }
});
