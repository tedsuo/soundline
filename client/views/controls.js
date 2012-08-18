SL.ControlsView = Backbone.View.extend({

  events:{
    'click #next-btn': 'nextTrack',
    'click #back-btn': 'prevTrack',
    'click #play-btn': 'playToggle'
  },

  initialize: function(o){
    this.playlists = o.playlists;
    this.playlists.on('change_track',this.render,this);
  },

  render: function(){
    this.$el.html(SL.t.controls());
    this.$viewer = $('#current-track-viewer',this.el);
    this.$viewer.html(SL.t.active_track({track:this.playlists.getActiveTrack()}));
    return this;
  },

  nextTrack: function(){
    var track = this.playlists.getActive().getNextTrack();
    this.playlists.getActive().setActiveTrack(track);
  },

  prevTrack: function(){
    var track = this.playlists.getActive().getPrevTrack();
    this.playlists.getActive().setActiveTrack(track);
  },

  playToggle: function(){}

});
