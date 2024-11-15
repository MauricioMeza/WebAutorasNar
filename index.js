var data = [
  {},
  {
    nombre: "Silvia Rodríguez Narváez",
    experiencia: 17,
    nacimientoLugar: "Pasto", 
    nacimientoFecha: 1994,
    residencia: "Pasto - Medellin",
    areas: "Teatro calle, circo, teatro sala, títeres y objetos, teatro comunitario, teatro infantil, clown dramático, teatro experimental, performance, investigación en filosofía teatral.",
    obras: [
      {nombre: "Extrasolar", año: 2015},
      {nombre: "Valium 10 - 25 climax", año: 2012},
      {nombre: "Una mujer de 4.0 en conducta", año: 2017},
      {nombre: "Lesa humanidad de un mango", año: 2021},
      {nombre: "Ataraxia", año: 2021},
      {nombre: "Metasujeto o la paradoja de existir", año: 2021},
      {nombre: "Contradiálogo", año: 2022},
      {nombre: "Vacío", año: 2023},
      {nombre: "La Resistencia", año: 2024},
      {nombre: "Polinices", año: 2024},
      {nombre: "Exilio", año: 2024},
    ],
    creacionColectiva: [
      {nombre: "Nada pasa", año: 2021},
      {nombre: "Memo, el elefante itinerante", año: 2022},
      {nombre: "Qué ruido hace el silencio", año: 2023},
    ],
    reconocimientos: [
      {nombre: "Portafolio de estímulos “La gran capital” de la Alcaldía de Pasto, categoría teatro, premio texto teatral obra inédita con Metasujeto o la paradoja de existir", año: 2021},
      {nombre: "Tesis de grado meritoria, Licenciatura en Filosofía y Letras de la Facultad de Ciencias Sociales y Humanidades de la  Universidad de Nariño con ATARAXIA", año: 2022},
      {nombre: "Dramaturgias de Mujeres del Sur con ATARAXIA -  ISBN: 978-958-53721-0-8", año: 2024},
      {nombre: "Panorama teatral colombiano: Dramaturgias emergentes -  ISBN: 978-628-01-5716-0"},
    ],
    perfil: "Licenciada en Filosofía y Letras y artista investigadora de la ciudad de Pasto. Hace 17 años se desenvuelve como actriz dentro de compañías de mediana y larga trayectoria donde, además, ha recibido formación en teatro sala, clown dramático, calle, circo y dirección. Su trayectoria dramatúrgica se ha fortalecido de la mano de maestros como Sergio Blanco, Paco Zarzoso, Verónica Musalem, Juan Pablo Troncoso y Ana Melo. Su investigación se centra en el teatro como medio para la reparación simbólica y la construcción de paz en su país. Con base en esto, ha venido trabajando como lazo social del Centro Nacional de Memoria Histórica apoyando iniciativas en los departamentos de Nariño y Putumayo. \n Esta dramaturga se interesa por los clásicos del teatro, especialmente por su ruptura en el contexto social actual y su vigencia en una realidad latinoamericana. Además, destaca su interés en la teoría teatral como puente para la comprensión del problema escénico en la creación."
  },
  {},
  {},
  {},
  {},
]

const scrollContainer = document.getElementById("content-time");

const exprcRes = document.getElementById("experienciaA");
const areasRes = document.getElementById("areasA");
const nombrRes = document.getElementById("nombreA");
const prfilRes = document.getElementById("perfilA");
const nacmtRes = document.getElementById("nacimientoA");

function openPopup(index) {
    document.querySelector('.overlay').style.display = 'flex';
    try{
      nombrRes.innerHTML = data[index].nombre;
      exprcRes.innerHTML = "Experiencia - <b>" + data[index].experiencia + " Años</b>";
      areasRes.innerHTML = "Areas - <b>" + truncateString(data[index].areas, 85) + "</b>";
      prfilRes.innerHTML = truncateString(data[index].perfil, 275);
      nacmtRes.innerHTML = "Nacimiento, <b>" + data[index].nacimientoLugar + "</b>, " + data[index].nacimientoFecha;
    }catch{
      nombrRes.innerHTML = "Nombre de la Autora";
      exprcRes.innerHTML = "00 Años";
      areasRes.innerHTML = "Area1, Area2, Area3";
      prfilRes.innerHTML = truncateString("Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.", 275);
      nacmtRes.innerHTML = "Nacimiento, <b>Ciudad</b>, Año";
    }
    
  }
  
function closePopup() {
    document.querySelector('.overlay').style.display = 'none';
}



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

function truncateString(str, max){
  if (str.length > max) {
    const start = str.slice(0, max);
    str = start + "...";
  }
  return str;
}
