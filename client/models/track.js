SL.Track = Backbone.Model.extend({
  urlRoot: function(){
    return this.get('playlist_id')+'/tracks';
  },
  initialize: function(){
    if(!this.has('id')) this.set({ 'id': SL.uid() });
  }
});
