const dialog = document.querySelector('[data-gallery-dialog]');
const links = [...document.querySelectorAll('[data-gallery-image]')];

if (dialog?.showModal && links.length) {
  const image = dialog.querySelector('img');
  const caption = dialog.querySelector('#lightbox-caption');
  const position = dialog.querySelector('[data-position]');
  let active = 0;

  function show(index) {
    active = (index + links.length) % links.length;
    const source = links[active];
    image.src = source.href;
    image.alt = source.querySelector('img').alt;
    caption.textContent = image.alt;
    position.textContent = `${active + 1} / ${links.length}`;
  }

  links.forEach((link, index) => link.addEventListener('click', event => {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    show(index);
    dialog.showModal();
  }));
  dialog.querySelector('[data-previous]').addEventListener('click', () => show(active - 1));
  dialog.querySelector('[data-next]').addEventListener('click', () => show(active + 1));
  dialog.addEventListener('keydown', event => {
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
      event.preventDefault();
      show(active + (event.key === 'ArrowLeft' ? -1 : 1));
    }
  });
}
