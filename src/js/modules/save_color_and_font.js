export const saveColorAndFont = () => {
  const $setBtn = document.getElementById('set-btn');
  const $modal = document.getElementById('modal');
  const $root = document.querySelector(':root');
  const $closeBtn = document.getElementById('close-btn');

// request values from localStorage and takes them if there are.
  (() => {
    const preferColor = localStorage.getItem('color');
    const preferFont = localStorage.getItem('font');
    if (preferColor) {
      $root.style.setProperty('--primary-clr', preferColor);
      document.querySelectorAll('.modal__clr').forEach($colorBtn => $colorBtn.classList.toggle('modal__clr--active', $colorBtn.dataset.color === preferColor));
    }
    if (preferFont) {
      $root.style.setProperty('--primary-font', preferFont);
      document.querySelectorAll('.modal__font').forEach($fontBtn => $fontBtn.classList.toggle('modal__font--active', $fontBtn.dataset.font === preferFont));
    }
  })();

  // the function that set the values to localStorage
  const saveSets = (e, className) => {
    const preferItemKey = Object.keys(e.target.dataset)[0];
    const preferItemValue = Object.values(e.target.dataset)[0];
    document.querySelectorAll(`.${className}`).forEach($element => $element.classList.toggle(`${className}--active`, e.target === $element));

    $root.style.setProperty(`--primary-${className.split('__')[1]}`, preferItemValue);
    localStorage.setItem(preferItemKey, preferItemValue);
  };

  $setBtn.addEventListener('click', () => $modal.classList.add('modal--show'));
  $modal.addEventListener('click', e => {
    if (e.target === $modal || e.target === $closeBtn) $modal.classList.remove('modal--show');
    if (e.target.classList.contains('modal__font')) saveSets(e, 'modal__font');
    if (e.target.classList.contains('modal__clr')) saveSets(e, 'modal__clr');
  });
};
