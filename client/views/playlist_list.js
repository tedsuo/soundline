SL.PlaylistListView = Backbone.View.extend({
  
  events:{
    'click #new-playlist-btn': 'newPlaylist',
    'dblclick .js-playlist-btn': 'editPlaylist',
    'click .js-delete': 'deletePlaylist'
  },
  
  initialize: function(o){
    this.playlists = o.playlists;
    this.selected_playlist_cid = 0;
    this.playlists.on('add',this.render,this);
    this.playlists.on('remove',this.render,this);
    this.playlists.on('change',this.render,this);
    this.playlists.on('reset',this.render,this);
  },

  render: function(){
    $('.js-playlist-btn',this.$el).tooltip('hide');
    this.$el.html(SL.t.playlist_list(this.getData()));
    $('.js-playlist-btn',this.$el).tooltip({placement:'right'});
    return this;
  },

  getData: function(){
    return {
      playlists: this.playlists,
      selected_playlist_cid: this.selected_playlist_cid
    }
  },

  newPlaylist: function(){
    var form = new SL.NewPlaylistView({
      playlists: this.playlists 
    });
    $('body').append(form.el);
    form.render();
    return false;
  },

  editPlaylist: function(e){
    console.log(e);
    var cid = $(e.currentTarget).data('cid');
    var form = new SL.EditPlaylistView({
      playlist: this.playlists.getByCid(cid)
    });
    $('body').append(form.el);
    form.render();
    return false;
  },

  deletePlaylist: function(e){
    var cid = $(e.currentTarget).data('cid');
    this.playlists.destroyByCid(cid);
  }
});
