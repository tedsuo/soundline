SL.timeFormat = function(time){
  time = Math.round(time / 1000);
  var minutes = Math.floor(time/60);
  var seconds = time % 60;
  if(seconds < 10) seconds = "0"+seconds.toString();
  return minutes+':'+seconds;
}
