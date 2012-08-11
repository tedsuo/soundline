SL.SplashView = Backbone.View.extend({
  
  events: {
    'click #login-btn':  'login'
  },

  render: function(){
    this.$el.html(SL.t.splash());
    return this;
  },

  login: function(){
    // initiate auth sequence 
    SL.current_user.authenticate();
  }
});
