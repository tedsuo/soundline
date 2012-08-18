SL.Track = Backbone.Model.extend({
  urlRoot: function(){
    return this.get('playlist_id')+'/tracks';
  },
  initialize: function(){
    if(!this.has('id')) this.set({ 'id': SL.uid() });
    this.active = false;
  },
  isActive: function(){
    return this.active;
  },
  activate: function(){
    this.active = true;
  },
  deactivate: function(){
    this.active =  false;
  }
});
