describe('User',function(){
  describe('initializeFromServer',function(done){
    it('should save the userdata', function(done){
      var user_id = _.uniqueId()+1;
      var user_name = 'test_'+user_id;
      var user = new SL.User();
      user.on('initialized',function(){
        SL.User.findById( user_id, function(err,u){
          if(err) return done(err);
          u.get('id').should.equal(user_id);
          u.get('username').should.equal(user_name);
          done();
        });
      });
      user.initializeFromServer({id:user_id, username:user_name});
    });
  });
});
