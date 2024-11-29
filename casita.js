const audioBoton = document.getElementById('icon-audio1');
const audioPlayer = document.getElementById('audio1');
var playing = false;

function playAudio(){
    if(!playing){
      audioPlayer.play();
      playing = true;
    }else{
      audioPlayer.load();
      playing = false;
    }
    
}