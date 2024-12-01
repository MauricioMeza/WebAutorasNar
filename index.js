/*-----------------------------------
----------- SELECTORS HTML ----------
-------------------------------------*/
const scrollContainer = document.getElementById("content-time");
const exprcRes = document.getElementById("experienciaA");
const areasRes = document.getElementById("areasA");
const nombrRes = document.getElementById("nombreA");
const prfilRes = document.getElementById("perfilA");
const nacmtRes = document.getElementById("nacimientoA");
const imgenRes = document.getElementById("popup-img");



/*----------------------------------
------------ POP-UP MAIN -----------
------------------------------------*/

function openPopup(index) {
    document.querySelector('.overlay').style.display = 'flex';
    try{
      nombrRes.innerHTML = data[index].nombre;
      exprcRes.innerHTML = "Experiencia - <b>" + data[index].experiencia + " Años</b>";
      areasRes.innerHTML = "Areas - <b>" + truncateString(data[index].areas, 85) + "</b>";
      prfilRes.innerHTML = truncateString(data[index].perfil, 275);
      nacmtRes.innerHTML = "Nacimiento, <b>" + data[index].nacimientoLugar + "</b>, " + data[index].nacimientoFecha;
      console.log(data[index].foto);
      if(data[index].foto != undefined){
        imgenRes.style.backgroundImage = 'url("' + data[index].foto + '")';
      }else{
        imgenRes.style.backgroundImage = '';  
      }
      
    }catch{
      nombrRes.innerHTML = "Nombre de la Autora";
      exprcRes.innerHTML = "00 Años";
      areasRes.innerHTML = "Area1, Area2, Area3";
      prfilRes.innerHTML = truncateString("Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.", 275);
      nacmtRes.innerHTML = "Nacimiento, <b>Ciudad</b>, Año";
      imgenRes.style.backgroundImage = '';  
    }
    
  }
  
function closePopup() {
    document.querySelector('.overlay').style.display = 'none';
}

function truncateString(str, max){
  if (str.length > max) {
    const start = str.slice(0, max);
    str = start + "...";
  }
  return str;
}



/*----------------------------------
------------ AUTOSCROLL ------------
------------------------------------*/
let scrollAmount = 0;
let scrollDirection = 1;
const scrollSpeed = 0.4; // Adjust this value to control the scroll speed
let autoScrolling = true;
// Function to automatically scroll horizontally
function autoScroll() {
  if (!autoScrolling) return;
  if (scrollAmount >= scrollContainer.scrollWidth - scrollContainer.clientWidth || scrollAmount < 0) {
    scrollDirection *= -1;
  }
  scrollAmount += scrollDirection * scrollSpeed;
  scrollContainer.scrollLeft = Math.floor(scrollAmount);
  requestAnimationFrame(autoScroll);
}
scrollContainer.addEventListener('mousedown', () => autoScrolling = false);
scrollContainer.addEventListener('touchstart', () => autoScrolling = false);
autoScroll();



/*----------------------------------
------------- CAROUSEL -------------
------------------------------------*/
