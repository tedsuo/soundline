/*
  # User
  
  User objects autheticate from SoundCloud, but can save additional data
  in our own db
  
  ## Custom Events
  - initialized
*/
SL.User = Backbone.Model.extend({
  urlRoot: '/users',
  
  initialize: function(){
    // see if we have an access token
    this.logged_in = SL.initializeAccessToken();
  },

  // login via soundcloud
  authenticate: function(){
    var user = this;
    SC.connect(function() {
      SL.setAccessToken(SC.storage().getItem('SC.accessToken'));
      user.logged_in = true;
      user.initializeFromSoundClound();
    });
  },
 
  isLoggedIn: function(){
    return this.logged_in;
  },

  logout: function(){
    SL.setAccessToken(null);
    user.logged_in = false;
  },

  // fetch user data from soundcloud
  initializeFromSoundClound: function(){
    var user = this;
    SC.get('/me', function(sc_user) {
      user.initializeFromServer(sc_user);
    });
  },
  
  // update the server with relevant soundcloud userdata,
  // fetch any additional soundline userdata
  initializeFromServer: function(sc_user){
    var user = this;
    
    // only save the fields we actually use
    var desired_fields = ['id','username','avatar_url','permalink_url'];
    var user_data = _.pick(sc_user,desired_fields);
    
    // rant: backbone's Save method signature is fucking obtuse
    user.save(user_data,{
      success: function(){
        user.trigger('initialized');
      }
    });
  }

},
  // Static Methods
{
  // helper method for fetching a user from the db, bypassing initialization
  // note: currently only used in tests
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
