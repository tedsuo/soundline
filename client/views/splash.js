SL.SplashView = Backbone.View.extend({
  
  events: {
    'click #login-btn':  'login'
  },

  render: function(){
    this.$el.html(SL.t.splash());
    return this;
  },

  login: function(){
    // initiate auth popup
    SC.connect(function() {
      SL.setAccessToken(SC.storage().getItem('SC.accessToken'));
      SC.get('/me', function(me) {
        
        console.log(me);
      });
    });
  }
});
