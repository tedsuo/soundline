SL.EditPlaylistView = Backbone.View.extend({ 
  events: {
    'click .js-remove': 'remove',
    'click .js-submit': 'submit',
    'submit form': 'submit'
  },
  
  initialize: function(o){
    this.playlist = o.playlist;
  },

  submit: function(){
    var params = SL.formToParams($('form',this.$el));
    this.playlist.save(params);
    this.remove();
  },

  render: function(){
   this.$el.html(SL.t.edit_playlist(this.getData()));
   $('input',this.$el).first().focus();
   return this;
  },

  getData: function(){
    return {
      playlist: this.playlist
    }
  }
});
