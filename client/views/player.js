SL.PlayerView = Backbone.View.extend({
  
  events: {
  },
  
  initialize: function(o){
    this.playlists_view = new SL.PlaylistListView({
      playlists: this.model.getPlaylists() 
    });
  },

  render: function(){
    this.$el.html(SL.t.player());
    this.playlists_view.setElement(document.getElementById('sidebar'));
    this.playlists_view.render();
    return this;
  }
  
});
