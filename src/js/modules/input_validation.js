// input validation

// for the dynamic validation.
export const validation = () => {
  const $containerInputs = document.getElementById('modal__container-inputs');
  $containerInputs.addEventListener('input', e => {
    if (e.target.value.length === 0) {
      e.target.classList.remove('modal__input--valid');
      e.target.classList.remove('modal__input--invalid');
    } else {
      e.target.classList.toggle('modal__input--valid', /^[\d]+$/.test(e.target.value) && +e.target.value > 600 && +e.target.value < 0);
      e.target.classList.toggle('modal__input--invalid', !/^[\d]+$/.test(e.target.value) || +e.target.value > 600 || +e.target.value < 0);
    }
  });
};

// for when the apply button has been clicked.
export const inputValidation = () => {
  const workTime = document.getElementById('circle--work').style.animationDuration[0];
  const shortBreakTime = document.getElementById('circle--short-break').style.animationDuration[0];
  const longBreakTime = document.getElementById('circle--long-break').style.animationDuration[0];
  if ((workTime === 0 || !workTime) && (shortBreakTime === 0 || !shortBreakTime) && (longBreakTime === 0 || !longBreakTime)) {
    let checkInputs = 0;
    document.querySelectorAll('.modal__input').forEach($input => {
      if (/^[\d]+$/.test($input.value) && +$input.value < 61 && +$input.value > 0) checkInputs++;
      else {
        $input.classList.remove('modal__input--valid');
        $input.classList.add('modal__input--invalid');
        return checkInputs;
      }
    });
    if (checkInputs === 3) {
      document.querySelector('.modal').click();
      return true;
    } else return false;
  }else return false
};
