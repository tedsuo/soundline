/*
  # Track
  
  tracks are db-backed models that also have the ability to stream an audio file.
  
  ## Custom Events
  - play
  - pause
  
*/
SL.Track = Backbone.Model.extend({

  urlRoot: function(){
    return this.get('playlist_id')+'/tracks';
  },
  
  initialize: function(){
    // id's are created client-side
    if(!this.has('id')) this.set({ 'id': SL.uid() });
    this.active = false;
    this.is_playing = false;
    this.stream = null;
  },
  
  isActive: function(){
    return this.active;
  },
  
  // load the sound file and start playing it
  activate: function(){
    this.active = true;
    this.loadStream();
    this.play();
  },
  
  // stop playing and unload sound file
  deactivate: function(){
    this.active =  false;
    this.unloadStream();
  },
  
  // fetch a sound file
  loadStream: function(){
    var track = this;
    SC.stream("/tracks/"+this.get('sc_id'), function(stream){
      track.stream = stream;
      if(track.is_playing) track.stream.play(track.getStreamOptions());
      else track.stream.load();
    });
  },
  
  // gc the sound file
  unloadStream: function(){
    this.is_playing = false;
    if(this.stream){
      this.stream.destruct();
      this.stream = null;
    }
  },
  
  // tells the sound file to automatically play the next track
  // when this one is complete
  getStreamOptions:function(){
    var track = this;
    return {
      onfinish: function(){
        track.is_playing = false;
        SL.player.nextTrack();
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
  },
  
  // get the current time position for the song, in milliseconds
  getPosition: function(){
    if(!this.stream) return 0; 
    return this.stream.position;
  }
});
