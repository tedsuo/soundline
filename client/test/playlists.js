describe('Playlists', function(){
  var playlists;
  beforeEach(function(){
    SL.current_user = new SL.User({id:SL.uid()});
    playlists = new SL.PlaylistList();
  });
  it('should create a playlist',function(done){
    playlists.on('sync',function(){
      var new_playlists = new SL.PlaylistList();
      new_playlists.fetch({
        success: function(){
          new_playlists.models.length.should.equal(1);
          new_playlists.models[0].get('name').should.equal('foo');
          done();
        },
        error: function(collection,resp){
          console.log(resp);
          done(err);
        }
      });
    });
    playlists.create({name:'foo',description:'bar'});
  })
});
