SL.TracklistView = Backbone.View.extend({
  events:{
    'submit .js-add-track-form': 'newTrack'
  },

  render: function(){
    console.log('render');
    this.$el.html(SL.t.track_list(this.getData()));
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
    if(this.playlist){
      this.playlist.off(null,null,this);
    }
    
    if(_.isEmpty(p)){
      this.playlist = undefined;
      return this.render();
    }

    this.playlist = p;
    this.playlist.on('add_tracks',this.render,this);
    this.render();
  },

  newTrack: function(){
    var url = $('.js-track-url-field',this.$el).val()
    if(!_.isEmpty(url)) this.playlist.addTracksFromUrl(url);
    return false;
  }

});
