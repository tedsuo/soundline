/*
  # NewPlaylistView
  
  shows a new playlist form popup.
  
  ## Model Access
  - Player
  
*/
SL.NewPlaylistView = Backbone.View.extend({ 
  events: {
    'click .js-remove': 'remove',
    'click .js-submit': 'submit',
    'submit form': 'submit'
  },
  
  initialize: function(o){
    this.player = o.player;
  },

  submit: function(){
    var params = SL.formToParams($('form',this.$el));
    this.player.create(params);
    this.remove();
    return false;
  },

  render: function(){
   this.$el.html( SL.t.new_playlist() );
   $('input',this.$el).first().focus();
   return this;
  }
});
