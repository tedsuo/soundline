/*
  # TracklistView
  
  Display a list of tracks in a playlist, along with an add track form.
  
  ## Model Access
  - Playlist
  
*/
SL.TracklistView = Backbone.View.extend({
  events:{
    'submit .js-add-track-form': 'newTrack',
    'click .js-track': 'changeTrack',
    'click .js-delete': 'deleteTrack'
  },

  initialize: function(){
    // note: playlist can only be set via setPlaylist
    this.playlist = null;
    this.loading_bar_timer_id =null;
  },
  
  render: function(){
    this.$el.html( SL.t.track_list(this.getData()) );
    this.$loader = $('#track-loader',this.$el);
    this.$loading_bar = $('#track-loading-bar',this.$el);
    this.$fail_msg = $('.fail-msg',this.$el);
  },

  showFailMsg: function(){
    this.stopLoader();
    this.$fail_msg.html(SL.t.add_track_fail());
    this.$fail_msg.show();    
  },
  
  startLoader: function(){
    var view = this;
    this.$fail_msg.hide();
    this.$loader.show();
    
    var tick = 2;
    var speed = 10;
    var stop_position = 95;
    this.loading_bar_timer_id = setInterval(function(){
      tick = tick + (speed / tick);
      if(tick > stop_position){
        clearInterval(view.progress_timer_id);
      } else {
        view.$loading_bar.css({width: tick+'%'});
      }
    },0);
  },
  
  stopLoader: function(){
    this.$loader.hide();
    clearInterval(this.loading_bar_timer_id);
  },
    
  getData: function(){
    if(this.playlist){
      return {
        playlist: this.playlist,
        tracks: this.playlist.getTracks()
      }
    } else {
      return {
        playlist: null,
        tracks: [] 
      }
    }
  },

  setPlaylist: function(p){
    // unbind form current playlist
    if(this.playlist){
      this.playlist.off(null,null,this);
    }
    
    // render blank if no playlist is selected
    if(_.isEmpty(p)){
      this.playlist = null;
      return this.render();
    }

    // bind to new playlist
    this.playlist = p;
    this.playlist.on('add_tracks',this.render,this);
    this.playlist.on('change_track',this.render,this);
    this.playlist.on('remove_track',this.render,this);
    this.playlist.on('add_tracks_failed',this.showFailMsg,this);
    this.render();
  },

  newTrack: function(){
    // get the url
    var url = $('.js-track-url-field',this.$el).val();
    
    if(_.isEmpty(url)) return false;
    
    // add the tracks
    this.playlist.addTracksFromUrl(url);
    this.startLoader();
    
    return false;
  },

  changeTrack: function(e){
    var id = $(e.currentTarget).data('id');
    this.playlist.setActiveTrack(id);
    return false;
  },

  deleteTrack: function(e){
    var id = $(e.currentTarget).data('id');
    this.playlist.removeTrack(id);
    return false;
  }

});
