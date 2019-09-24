const Scene = require('Scene');
const Time = require('Time');
const Patches = require('Patches');

var timeText = Scene.root.find('timeText');

// Initial value
var initialTimeSecond = 0;
var initialTimeMinute = 0;
var intervalTime;
timeText.text = "00:00";

// Get Patches Value
var startTimeTrigger = Patches.getBooleanValue('startTimeTrigger');

//start & reset time trigger
startTimeTrigger.monitor().subscribe(function (e) {
  if (e.newValue == true || e.oldValue == false ) {
    startIntervalTimer();
  }else{
    //reset time
    stopIntervalTimer();
    initialTimeSecond = 0;
    initialTimeMinute = 0;
    timeText.text = "00:00";
  }
});



// -- Function Time
function startIntervalTimer() {
  intervalTime = Time.setInterval(timeInMinuteSecond, 1000);
}
function timeInMinuteSecond(){
  if(initialTimeSecond >= 59){
    initialTimeSecond = -1;
    initialTimeSecond = initialTimeSecond + 1;

    initialTimeMinute = initialTimeMinute + 1;
  }else{
    initialTimeSecond = initialTimeSecond + 1;
  }

  if(initialTimeMinute >= 1){
    if(initialTimeSecond > 9){
      timeText.text = "0"+initialTimeMinute+":"+initialTimeSecond
    }else{
      timeText.text = "0"+initialTimeMinute+":0"+initialTimeSecond
    }
  }else{
    if(initialTimeSecond > 9){
      timeText.text = "00:"+initialTimeSecond
    }else{
      timeText.text = "00:0"+initialTimeSecond
    }
  }
}
function stopIntervalTimer() {
  Time.clearInterval(intervalTime);
}