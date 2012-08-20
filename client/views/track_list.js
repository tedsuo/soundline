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
  },
  
  render: function(){
    this.$el.html( SL.t.track_list(this.getData()) );
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
    this.render();
  },

  newTrack: function(){
    // get the url
    var url = $('.js-track-url-field',this.$el).val();
    // add the tracks
    if(!_.isEmpty(url)) this.playlist.addTracksFromUrl(url);
    
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
