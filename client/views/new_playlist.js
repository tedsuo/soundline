SL.NewPlaylistView = Backbone.View.extend({ 
  events: {
    'click .js-remove': 'remove',
    'click .js-submit': 'submit',
    'submit form': 'submit'
  },
  
  initialize: function(o){
    this.playlists = o.playlists;
  },

  submit: function(){
    var params = SL.formToParams($('form',this.$el));
    this.playlists.create(params);
    this.remove();
  },

  render: function(){
   this.$el.html(SL.t.new_playlist());
   $('input',this.$el).first().focus();
   return this;
  }
});
