SL.User = Backbone.Model.extend({
  urlRoot: '/users',

  authenticate: function(){
    var user = this;
    SC.connect(function() {
      SL.setAccessToken(SC.storage().getItem('SC.accessToken'));
      user.initializeFromSoundClound();
    });
  },
 
  isLoggedIn: function(){
    return SL.initializeAccessToken();
  },

  logout: function(){
    SL.setAccessToken(null);
  },

  initializeFromSoundClound: function(){
    var user = this;
    SC.get('/me', function(sc_user) {
      user.initializeFromServer(sc_user);
    });
  },
  
  initializeFromServer: function(sc_user){
    var user = this;
    var desired_fields = ['id','username','avatar_url'];
    var desired_fields = ['id','username','avatar_url','permalink_url'];
    var user_data = _.pick(sc_user,desired_fields);
    user.save(user_data,{
      success: function(){
        user.trigger('initialized');
      },
      error: function(){
        console.log('init failure');
      }
    });
  }

},
  // Static Methods
{
  findById: function(id,cb){
    var user = new SL.User({id:id});
    user.fetch({
      success: function(model){
        cb(null,model);
      },
      error: function(model,response){
        cb( new Error('cannot find user'));
      }
    });
  } 
});
