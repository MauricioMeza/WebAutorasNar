/*-----------------------------------
----------- SELECTORS HTML ----------
-------------------------------------*/
const nomeAutora = document.getElementsByClassName('data-info-name')[0];
const descAutora = document.getElementsByClassName('data-info-container')[0];
const imgsAutora = document.getElementsByClassName('carousel-inner')[0];
const obrasAutora = document.getElementsByClassName('obras-list')[0];
const colctAutora = document.getElementsByClassName('obras-list')[1];
const premsAutora = document.getElementsByClassName('obras-list')[2];
const refrnAutora = document.getElementById('referenciaB');
const exprnAutora = document.getElementById('experienciaB');
const areasAutora = document.getElementById('areasB');
const audioTime = document.getElementById('audio-time');
const audioPlayer = document.getElementById('audio1');

/*------------------------------------
----------- INFO REFERENCES ----------
--------------------------------------*/
autoraIndex = 2;
nomeAutora.innerHTML = data[autoraIndex].nombre;
refrnAutora.innerHTML = 'Nacimiento - <b>' + data[autoraIndex].nacimientoLugar + '</b> ' + data[autoraIndex].nacimientoFecha + '<br>' +
                        'Residencia - <b>' +  data[autoraIndex].residencia + '</b>';
exprnAutora.innerHTML = 'Caminar Dramaturgico - <b>' + data[autoraIndex].experiencia + ' Años</b>';
areasAutora.innerHTML = '<b>' + data[autoraIndex].areas + '</b>';

descAutora.innerHTML = '';
parrafosPerfil = data[autoraIndex].perfil.split('\n');
parrafosPerfil.forEach(element => {
  const paragraph = `<p class="data-info-text">${element}</p>`
  descAutora .innerHTML += paragraph;
});

addObras(obrasAutora, data[autoraIndex].obras)
addObras(colctAutora, data[autoraIndex].creacionColectiva)
addObras(premsAutora, data[autoraIndex].reconocimientos)
function addObras(container, data){
  container.innerHTML = '';
  data.forEach(element => {
    const obra = document.createElement("li");
    obra.innerHTML = '<b>' + element.nombre;
    if(element.año != undefined){
      obra.innerHTML += ' - </b>' + element.año; 
    }
    container.appendChild(obra);
  });
}

imgsAutora.innerHTML = '';
data[autoraIndex].galeria.forEach((imageSrc, index) => {
  carouselItemHTML = 
  `<div class="carousel-item ${index === 0 ? 'active' : ''}">
    <img src="${imageSrc}" class="d-block w-100" alt="Slide ${index + 1}">
  </div>`
  imgsAutora.innerHTML += carouselItemHTML;
});





/*-----------------------------------
------------ AUDIO PLAYERS ----------
-------------------------------------*/
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