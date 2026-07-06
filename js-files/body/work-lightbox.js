export function initWorkLightbox() {
  const cards = document.querySelectorAll('.work__card[data-full]');
  if (!cards.length) return;

  const overlay = document.createElement('div');
  overlay.className = 'lightbox';
  overlay.setAttribute('aria-hidden', 'true');
  overlay.innerHTML = `
    <button class="lightbox__close" type="button" aria-label="Закрыть">×</button>
    <div class="lightbox__scroll">
      <img class="lightbox__image" alt="" />
    </div>
  `;
  document.body.appendChild(overlay);

  const image = overlay.querySelector('.lightbox__image');
  const scroll = overlay.querySelector('.lightbox__scroll');

  const open = (src, alt) => {
    image.src = src;
    image.alt = alt;
    overlay.classList.add('is-open');
    overlay.setAttribute('aria-hidden', 'false');
    document.body.classList.add('lightbox-open');
    scroll.scrollTop = 0;
  };

  const close = () => {
    overlay.classList.remove('is-open');
    overlay.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('lightbox-open');
  };

  cards.forEach((card) => {
    card.addEventListener('click', (event) => {
      event.preventDefault();
      const name = card.querySelector('.work__name');
      open(card.getAttribute('data-full'), name ? name.textContent.trim() : '');
    });
  });

  overlay.addEventListener('click', (event) => {
    if (event.target === overlay || event.target.closest('.lightbox__close')) {
      close();
    }
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && overlay.classList.contains('is-open')) {
      close();
    }
  });
}
