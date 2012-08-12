SL.NewPlaylistView = Backbone.View.extend({ 
  events: {
    'click .js-remove': 'remove'
  },

  render: function(){
   this.$el.html(SL.t.new_playlist());
   $('input',this.$el).first().focus();
   return this;
  }
});
