SL.Track = Backbone.Model.extend({
  urlRoot: function(){
    return this.get('playlist_id')+'/tracks';
  },
  initialize: function(){
    if(!this.has('id')) this.set({ 'id': SL.uid() });
    this.active = false;
    this.is_playing = false;
  },
  isActive: function(){
    return this.active;
  },
  activate: function(){
    this.active = true;
  },
  deactivate: function(){
    this.active =  false;
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
    console.log('playing');
    this.trigger('play',this);
  },
  pause: function(){
    if(this.is_playing === false) return;
    this.is_playing = false;
    console.log('paused');
    this.trigger('pause',this);
  }
});
