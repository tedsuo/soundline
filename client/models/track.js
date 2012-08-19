SL.Track = Backbone.Model.extend({
  urlRoot: function(){
    return this.get('playlist_id')+'/tracks';
  },
  initialize: function(){
    if(!this.has('id')) this.set({ 'id': SL.uid() });
    this.active = false;
    this.is_playing = false;
    this.stream = null;
  },
  isActive: function(){
    return this.active;
  },
  activate: function(){
    this.active = true;
    this.loadStream();
    this.play();
  },
  deactivate: function(){
    this.active =  false;
    this.unloadStream();
  },
  loadStream: function(){
    var track = this;
    SC.stream("/tracks/"+this.get('sc_id'), function(stream){
      track.stream = stream;
      if(track.is_playing) track.stream.play(track.getStreamOptions());
      else track.stream.load();
    });
  },
  unloadStream: function(){
    this.is_playing = false;
    if(this.stream){
      this.stream.destruct();
      this.stream = null;
    }
  },
  getStreamOptions:function(){
    var track = this;
    return {
      onfinish: function(){
        track.is_playing = false;
        SL.playlists.nextTrack();
      }
    }
  },
  isPlaying: function(){
    return this.is_playing;
  },
  playToggle: function(){
    if(this.is_playing) this.pause();
    else this.play();
  },
  play: function(){
    if(this.is_playing === true) return;
    this.is_playing = true;
    this.trigger('play',this);
    if(this.stream) this.stream.play(this.getStreamOptions());
  },
  pause: function(){
    if(this.is_playing === false) return;
    this.is_playing = false;
    this.trigger('pause',this);
    if(this.stream) this.stream.pause();
  }
});
