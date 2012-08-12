SL.PlaylistListView = Backbone.View.extend({
  
  events:{
    'click #new-playlist-btn': 'newPlayList'
  },
  
  initialize: function(o){
    this.playlists = o.playlists;
    this.selected_playlist_cid = 0;
    this.playlists.on('add',this.render,this);
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
    var form = new SL.NewPlaylistView({
      playlist: new SL.Playlist()
    });
    $('body').append(form.el);
    form.render();
  }
});
