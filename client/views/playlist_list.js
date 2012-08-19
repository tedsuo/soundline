SL.PlaylistListView = Backbone.View.extend({
  
  events:{
    'click #new-playlist-btn': 'newPlaylist',
    'click .js-playlist-btn': 'selectPlaylist',
    'dblclick .js-playlist-btn': 'editPlaylist',
    'click .js-delete': 'deletePlaylist'
  },
  
  initialize: function(o){
    this.playlists = o.playlists;
    this.selected_playlist_cid = 0;
    this.playlists.on('add',this.render,this);
    this.playlists.on('remove',this.render,this);
    this.playlists.on('change',this.render,this);
    this.playlists.on('select_playlist',this.render,this);
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
      selected_playlist_id: this.playlists.getSelectedPlaylistId()
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
    var id = $(e.currentTarget).data('id');
    var form = new SL.EditPlaylistView({
      playlist: this.playlists.get(cid)
    });
    $('body').append(form.el);
    form.render();
    return false;
  },

  deletePlaylist: function(e){
    var id = $(e.currentTarget).data('id');
    var p = this.playlists.get(id);
    var msg = 'Do you want to delete the playlist "'+p.get('name')+'"?\n\nOr do you just have fat fingers?';
    if( window.confirm(msg)){
      p.destroy();
    }
    return false;
  },

  selectPlaylist: function(e){
    var id = $(e.currentTarget).data('id');
    this.playlists.selectPlaylist(id);
    return false;
  }

});
