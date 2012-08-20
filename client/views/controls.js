SL.ControlsView = Backbone.View.extend({

  events:{
    'click #next-btn': 'nextTrack',
    'click #back-btn': 'prevTrack',
    'click #play-btn': 'playToggle'
  },

  initialize: function(o){
    this.player = o.player;
    this.track = null;
    this.player.on('change_track',this.changeTrack,this);
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
    if(_.isEmpty(this.track)) return;
    this.$viewer.html(SL.t.active_track({track:this.track}));
    this.$track_position = $('#current-time',this.el);
  },

  renderTrackPosition: function(){
    if(_.isEmpty(this.track)) return;
    this.$track_position.html(SL.timeFormat(this.track.getPosition()));
  },

  changeTrack: function(){
    if(this.track) this.track.off(null,null,this);
    this.track = this.player.getActiveTrack();
    this.onPlay();
    this.track.on('play',this.onPlay,this);
    this.track.on('pause',this.onPause,this);
    this.renderTrackViewer();
  },

  nextTrack: function(){
    this.player.nextTrack();
  },

  prevTrack: function(){
    this.player.prevTrack();
  },

  playToggle: function(){
    this.player.playToggle();
  },

  onPlay: function(){
    var controls = this;
    this.$play_icon.hide();
    this.$pause_icon.show();
    this.position_interval_id = setInterval(function(){
      controls.renderTrackPosition();
    },250);
  },

  onPause: function(){
    this.$play_icon.show();
    this.$pause_icon.hide();
    if(this.position_interval_id){
      clearInterval(this.position_interval_id);
      this.position_interval_id = null;
    }
  }

});
