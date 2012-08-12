SL.PlaylistListView = Backbone.View.extend({
  
  events:{
  },
  
  initialize: function(o){
    this.playlists = o.playlists;
    this.selected_playlist_cid = 0;
  },

  render: function(){
    this.$el.html(SL.t.playlist_list(this.getData()));
    return this;
  },

  getData: function(){
    return {
      playlists: this.playlists,
      selected_playlist_cid: this.selected_playlist_cid
    }
  },

  newPlayList: function(){
  
  }
});
