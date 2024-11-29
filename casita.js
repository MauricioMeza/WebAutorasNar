const audioTime = document.getElementById('audio-time');
const audioPlayer = document.getElementById('audio1');
var playing = false;



function playAudio(){
    if(!playing){
      audioPlayer.play();
      playing = true;
      updateTime();
    }else{
      audioPlayer.load();
      playing = false;
      updateTime();
    }
}

audioPlayer.addEventListener('loadedmetadata', updateTime);
audioPlayer.addEventListener('timeupdate', updateTime);
function updateTime(){
  if(playing){
    audioTime.innerHTML = secondsFormat(audioPlayer.currentTime) + "/" +  secondsFormat(audioPlayer.duration);
  }else{
    audioTime.innerHTML = secondsFormat(audioPlayer.duration);;
  }
}
updateTime()

function secondsFormat(seconds){
  console.log(seconds)
  console.log(seconds === NaN)
  if(isNaN(seconds)){
    return "00:00"
  }
  mins = Math.floor(seconds/60);
  secs = Math.floor(seconds-(mins*60));
  if(mins < 10) mins = "0" + mins;
  if(secs < 10) secs = "0" + secs;
  return mins + ":" + secs;
}