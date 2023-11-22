const input = document.querySelector('.search');
const barsMenu = document.getElementById("bars-menu");
const mobileMenu = document.querySelector(".menu-mobile");
const menuItem = document.querySelectorAll('.has-submenu');
const bullets = document.querySelectorAll('.slider__bullet');
const container = document.querySelector('.slider__container');
const items = document.querySelectorAll('.slider__item');
const menuItems = document.querySelectorAll('.menu-mobile__item');

// Funcion para que el buscador abra y cierre
function toggleClass(className) {
  return () => input.classList.toggle(className);
}
input.addEventListener('focus', toggleClass('open'));
input.addEventListener('mouseover', toggleClass('hover'));
input.addEventListener('mouseout', toggleClass('hover'));
document.addEventListener('click', (event) => {
  const isClickInside = input.contains(event.target);
  if (!isClickInside) {
    input.classList.remove('open');
  }
});

// Menu Hamburguesa
document.querySelector(".bars__menu").addEventListener("click", animateBars);
var line1__bars = document.querySelector(".line1__bars-menu");
var line2__bars = document.querySelector(".line2__bars-menu");
var line3__bars = document.querySelector(".line3__bars-menu");
function animateBars(){
    line1__bars.classList.toggle("activeline1__bars-menu");
    line2__bars.classList.toggle("activeline2__bars-menu");
    line3__bars.classList.toggle("activeline3__bars-menu");
}
// Arrow Rotate
menuItem.forEach(item => {
  item.addEventListener('click', event => {
    event.stopPropagation();
    item.classList.toggle('open');
  });
});

// Apertura y cierre del menu mobile
barsMenu.addEventListener("click", function() {
  mobileMenu.classList.toggle("inactive");
});

// Overflow Hidden cuando se abre el menu mobile
window.addEventListener('load', function() {
  const body = document.body;

  barsMenu.addEventListener('click', function() {
    mobileMenu.classList.toggle('open');
    body.classList.toggle('scroll-hidden');
  });
});

// Abrir y cerrar list-desplegable en menu mobile
menuItems.forEach(item => {
  item.addEventListener('click', function() {
    const submenu = item.querySelector('.menu-mobile__list-desplegable');
    if (submenu) {
      const isVisible = submenu.style.display === 'block';
      hideAllSubmenus();
      if (!isVisible) {
        submenu.style.display = 'block';
      }
    }
  });
});
function hideAllSubmenus() {
  const submenus = document.querySelectorAll('.menu-mobile__list-desplegable');
  submenus.forEach(submenu => {
    submenu.style.display = 'none';
  });
}

// Swiper
document.addEventListener('DOMContentLoaded', function() {
  let currentIndex = 0;
  let slideInterval = setInterval(nextSlide, 3000);

  function nextSlide() {
    currentIndex = (currentIndex + 1) % items.length;
    goToSlide(currentIndex);
  }

  function goToSlide(index) {
    container.style.transform = 'translateX(-' + (index * 100) + '%)';
    updateBullets(index);
  }

  function updateBullets(index) {
    bullets.forEach(function(bullet, i) {
      if (i === index) {
        bullet.classList.add('active');
      } else {
        bullet.classList.remove('active');
      }
    });
  }

  function slideWithBullet(index) {
    clearInterval(slideInterval);
    goToSlide(index);
    currentIndex = index;
    slideInterval = setInterval(nextSlide, 3000);
  }

  bullets.forEach(function(bullet, index) {
    bullet.addEventListener('click', function() {
      slideWithBullet(index);
    });
  });
  bullets[currentIndex].classList.add('active');
});

