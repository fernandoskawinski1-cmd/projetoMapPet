const carrossel = new Swiper('.carrossel', {
  slidesPerView: 1,
  slidesPerGroup: 1,
  spaceBetween: 15,
  speed: 500,
  loop: true,
  pagination: { el: '.paginacao', clickable: true },
  navigation: { nextEl: '.proximo', prevEl: '.anterior' },
  breakpoints: {
    600: { slidesPerView: 2, slidesPerGroup: 2 },
    900: { slidesPerView: 3, slidesPerGroup: 3 }
  }
});