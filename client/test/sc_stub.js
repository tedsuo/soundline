var SC = {
  initialize: function(){},
  connect: function(cb){
    setTimeout(cb,0);
  },
  storage: function(){
    return {
      getItem: function(){
        return "1-22805-20486322-bc1054c258d5618";
      },
      setItem: function(){}
    }
  },
  get:function(path,cb){
    cb({"id":20486322,"kind":"user","permalink":"tedsuo","username":"tedsuo","uri":"https://api.soundcloud.com/users/20486322","permalink_url":"http://soundcloud.com/tedsuo","avatar_url":"https://i1.sndcdn.com/avatars-000018804416-onm3d7-large.jpg?4b4189b","country":"United States","full_name":"Ted Young","description":null,"city":"San Francisco","discogs_name":null,"myspace_name":null,"website":null,"website_title":null,"online":false,"track_count":0,"playlist_count":1,"public_favorites_count":1,"followers_count":1,"followings_count":0,"plan":"Free","private_tracks_count":0,"private_playlists_count":0,"primary_email_confirmed":true});
  }
}
