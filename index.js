function openPopup() {
    document.querySelector('.overlay').style.display = 'flex';
  }
  
function closePopup() {
    document.querySelector('.overlay').style.display = 'none';
}


const scrollContainer = document.getElementById("content-time");
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




// Start the scrolling
autoScroll();

