SL.formToParams = function($form){
  var params = {};
  _.forEach($form.serializeArray(),function(item){
    params[item.name] = item.value;
  });
  return params;
};
