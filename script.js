// ===== ELEMENTOS =====
const menuBtn = document.getElementById('menu-btn');
const menu = document.getElementById('menu');
const menuFundo = document.getElementById('menu-fundo');
const header = document.querySelector('.header');

// ===== MENU LATERAL =====
function abrirMenu() {
  menu.hidden = false;
  menuFundo.hidden = false;
  menuBtn.classList.add('aberto');
  menuBtn.setAttribute('aria-expanded', 'true');
  menuBtn.setAttribute('aria-label', 'Fechar menu');
}

function fecharMenu() {
  menu.hidden = true;
  menuFundo.hidden = true;
  menuBtn.classList.remove('aberto');
  menuBtn.setAttribute('aria-expanded', 'false');
  menuBtn.setAttribute('aria-label', 'Abrir menu');
}

function alternarMenu() {
  if (menu.hidden) {
    abrirMenu();
  } else {
    fecharMenu();
  }
}

menuBtn.addEventListener('click', alternarMenu);
menuFundo.addEventListener('click', fecharMenu);

// Fecha o menu ao clicar em qualquer link dele
menu.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', fecharMenu);
});

// Fecha o menu com a tecla Esc
document.addEventListener('keydown', (evento) => {
  if (evento.key === 'Escape' && !menu.hidden) {
    fecharMenu();
  }
});

// ===== SOMBRA NO CABEÇALHO AO ROLAR =====
function atualizarSombra() {
  header.classList.toggle('rolou', window.scrollY > 10);
}

window.addEventListener('scroll', atualizarSombra);
atualizarSombra();

// ===== CARROSSEL (só existe na index) =====
// Sem esta verificação, a página de animais mostra o erro "Swiper is not defined".
if (document.querySelector('.carrossel') && typeof Swiper !== 'undefined') {
  const carrossel = new Swiper('.carrossel', {
    slidesPerView: 1,     // celular: 1 cartão
    slidesPerGroup: 1,
    spaceBetween: 15,
    speed: 500,
    loop: true,

    // Indicadores circulares
    pagination: { el: '.paginacao', clickable: true },

    // Setas de navegação
    navigation: { nextEl: '.proximo', prevEl: '.anterior' },

    breakpoints: {
      600: { slidesPerView: 2, slidesPerGroup: 2 },   // tablet: 2 cartões
      900: { slidesPerView: 3, slidesPerGroup: 3 }    // desktop: 3 cartões
    }
  });
}