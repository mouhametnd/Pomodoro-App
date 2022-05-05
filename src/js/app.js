'use strict';
import { clock, setValues, showSpanError } from './modules/clock.js';
import { validation, inputValidation } from './modules/input_validation.js';
import { saveColorAndFont } from './modules/save_color_and_font.js';

window.addEventListener('DOMContentLoaded', () => {
  saveColorAndFont();
  clock();
  validation();

  const $applyBtn = document.getElementById('modal__btn-apply');
  const $modal = document.getElementById('modal');
  document.addEventListener('keyup', e => {
    if (e.key === 'Enter' && $modal.classList.contains('modal--show')) $applyBtn.click();
  });
  $applyBtn.addEventListener('click', () => (inputValidation() ? setValues() : showSpanError('.modal__span-error')));
});
