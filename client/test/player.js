describe('Player', function(){
  var player;
  beforeEach(function(){
    SL.current_user = new SL.User({id:SL.uid()});
    player = new SL.PlaylistList();
  });
  it('should create a playlist',function(done){
    player.on('sync',function(){
      var new_player = new SL.PlaylistList();
      new_player.fetch({
        success: function(){
          new_player.models.length.should.equal(1);
          new_player.models[0].get('name').should.equal('foo');
          done();
        },
        error: function(collection,resp){
          console.log(resp);
          done(new Error('fail'));
        }
      });
    });
    player.create({name:'foo',description:'bar'});
  });
 
  it('should destroy player by cid', function(done){
    player.create({name:'first',description:'bar'});
    player.create({name:'second',description:'bar'});
    var cid = player.at(0).cid;
    player.on('sync',function(){
      var new_player = new SL.PlaylistList();
      new_player.fetch({
        success: function(){
          new_player.models.length.should.equal(1);
          new_player.models[0].get('name').should.equal('second');
          done();
        },
        error: function(collection,resp){
          console.log(resp);
          done(new Error('fail'));
        }
      });
    });
    player.destroyByCid(cid);
  })
});
