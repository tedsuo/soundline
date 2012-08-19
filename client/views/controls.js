SL.ControlsView = Backbone.View.extend({

  events:{
    'click #next-btn': 'nextTrack',
    'click #back-btn': 'prevTrack',
    'click #play-btn': 'playToggle'
  },

  initialize: function(o){
    this.playlists = o.playlists;
    this.track = null;
    this.playlists.on('change_track',this.changeTrack,this);
  },

  render: function(){
    this.$el.html(SL.t.controls());
    this.$viewer = $('#current-track-viewer',this.el);
    this.$play_icon = $('#play-icon',this.el);
    this.$pause_icon = $('#pause-icon',this.el);
    this.renderTrackViewer();
    return this;
  },

  renderTrackViewer: function(){
    if(this.track){
      this.$viewer.html(SL.t.active_track({track:this.track}));
    }
  },

  changeTrack: function(){
    if(this.track) this.track.off(null,null,this);
    this.track = this.playlists.getActiveTrack();
    this.track.on('play',this.onPlay,this);
    this.track.on('pause',this.onPause,this);
    this.renderTrackViewer();
  },

  nextTrack: function(){
    this.playlists.nextTrack();
  },

  prevTrack: function(){
    this.playlists.prevTrack();
  },

  playToggle: function(){
    this.playlists.playToggle();
  },

  onPlay: function(){
    this.$play_icon.hide();
    this.$pause_icon.show();
  },

  onPause: function(){
    this.$play_icon.show();
    this.$pause_icon.hide();
  }

});
