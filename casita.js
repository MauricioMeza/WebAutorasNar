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
const audiosAutora = document.getElementById('audios');


/*------------------------------------
----------- INFO REFERENCES ----------
--------------------------------------*/
const params = new URLSearchParams(window.location.search);
const url = params.get('nombre');
autoraIndex = data.findIndex(item => item.url === url);


//----- Info Data General -------
nomeAutora.innerHTML = data[autoraIndex].nombre;
refrnAutora.innerHTML = 'Nacimiento - <b>' + data[autoraIndex].nacimientoLugar + '</b> ' + data[autoraIndex].nacimientoFecha + '<br>' +
                        'Residencia - <b>' +  data[autoraIndex].residencia + '</b>';
exprnAutora.innerHTML = 'Caminar Dramaturgico - <b>' + data[autoraIndex].experiencia + ' Años</b>';
areasAutora.innerHTML = '<b>' + data[autoraIndex].areas + '</b>';

//----- Info Data Descripcion -------
descAutora.innerHTML = '';
parrafosPerfil = data[autoraIndex].perfil.split('\n');
parrafosPerfil.forEach(element => {
  const paragraph = `<p class="data-info-text">${element}</p>`
  descAutora.innerHTML += paragraph;
});

//----- Info Data Obras-Premios -------
addObras(obrasAutora, data[autoraIndex].obras)
addObras(colctAutora, data[autoraIndex].creacionColectiva)
addObras(premsAutora, data[autoraIndex].reconocimientos)
function addObras(container, data){
  container.innerHTML = '';
  if(data != undefined){
    data.forEach(element => {
      const obra = document.createElement("li");
      obra.innerHTML = '<b>' + element.nombre;
      if(element.año != undefined){
        obra.innerHTML += ' - </b>' + element.año; 
      }
      container.appendChild(obra);
    });
  }else{
    container.parentElement.parentElement.style.display = "none";
  }
  
}

//----- Info Data Galeri-Imgs -------
imgsAutora.innerHTML = '';
data[autoraIndex].galeria.forEach((imageSrc, index) => {
  carouselItemHTML = 
  `<div class="carousel-item ${index === 0 ? 'active' : ''}">
    <img src="${imageSrc}" class="d-block w-100" alt="Slide ${index + 1}">
  </div>`
  imgsAutora.innerHTML += carouselItemHTML;
});

//----- Info Data Audio -------
audiosAutora.innerHTML = '';
var audioPlayers = []
data[autoraIndex].audio.forEach((audio, index) => {
  audioItemHTML = 
  `<div class="popup-audio">
      <img id="icon-audio1" class="popup-audio-icon" src="./assets/BOTÓN-AUDIO.png" onclick="playAudio(${index})">
      <span> <b>${audio.nombre} </b> - <i id=${"audio-time"+index}>0:00</i></span>
      <span>${audio.desc}</span>
      <span></span>
      <audio id=${"audio"+index} src=${audio.file}></audio>
  </div>`
  audiosAutora.innerHTML += audioItemHTML;
  var audio = document.getElementById("audio"+index)
  audioPlayers.push(audio)
});



/*-----------------------------------
------------ AUDIO PLAYERS ----------
-------------------------------------*/
var playing = []
audioPlayers.forEach(() => {
 playing.push(false)
})
function playAudio(index){
    if(!playing[index]){
      audioPlayers[index].play();
      playing[index] = true;
      updateTime(index);
    }else{
      audioPlayers[index].load();
      playing[index] = false;
      updateTime(index);
    }
}

function secondsFormat(seconds){
  if(isNaN(seconds)){
    return "00:00"
  }
  mins = Math.floor(seconds/60);
  secs = Math.floor(seconds-(mins*60));
  if(mins < 10) mins = "0" + mins;
  if(secs < 10) secs = "0" + secs;
  return mins + ":" + secs;
}

audioPlayers.forEach((player, index) => {
  player.addEventListener('loadedmetadata', (e) => {updateTime(index)});
  player.addEventListener('timeupdate', (e) => {updateTime(index)});
})

function updateTime(index){
  if(playing[index]){
    document.getElementById(`audio-time${index}`).innerHTML = secondsFormat(audioPlayers[index].currentTime) + "/" +  secondsFormat(audioPlayers[index].duration);
  }else{
    document.getElementById(`audio-time${index}`).innerHTML = secondsFormat(audioPlayers[index].duration);
  }
}
