let workTimeStamp = 0;
let shortBreakTimeStamp = 0;
let longBreakTimeStamp = 0;
const $clockTime = document.getElementById('clock__time');

// this function draws the time of the clock depending on which clock is active.
const drawClockTime = clock => {
  if (clock === 'work') $clockTime.textContent = `0${Math.floor(workTimeStamp / 60000)}`.slice(-2) + `:` + `0${Math.floor((workTimeStamp % 60000) / 1000)}`.slice(-2);
  else if (clock === 'short-break') $clockTime.textContent = `0${Math.floor(shortBreakTimeStamp / 60000)}`.slice(-2) + ':' + `0${Math.floor((shortBreakTimeStamp % 60000) / 1000)}`.slice(-2);
  else if (clock === 'long-break') $clockTime.textContent = `0${Math.floor(longBreakTimeStamp / 60000)}`.slice(-2) + ':' + `0${Math.floor((longBreakTimeStamp % 60000) / 1000)}`.slice(-2);
};

// this function returns the clock that's active.
const whichClockIsActive = () => {
  const clockActive = document.querySelector('li.active').dataset.clock;
  document.querySelectorAll('.clock__svg-circle').forEach($circle => $circle.classList.toggle('clock__svg-circle--active', $circle.id === `circle--${clockActive}`));
  if (clockActive === 'work') return 'work';
  else if (clockActive === 'short-break') return 'short-break';
  else return 'long-break';
};

// for showing the errors
export const showSpanError = className => {
  const $spanError = document.querySelector(className);
  $spanError.classList.add('span-error--show');
  setTimeout(() => $spanError.classList.remove('span-error--show'), 2000);
};

// this function set the values of each input in timeStamp inside the correct variable also it's setting the animation duration of each clock and reset the values of the inputs.
export const setValues = () => {
  workTimeStamp = document.getElementById('work-input').value * 60 * 1000;
  shortBreakTimeStamp = document.getElementById('short-break-input').value * 60 * 1000;
  longBreakTimeStamp = document.getElementById('long-break-input').value * 60 * 1000;

  document.querySelectorAll('.modal__input').forEach($input => {
    document.getElementById(`circle--${$input.dataset.id}`).style.animationDuration = `${$input.value * 60 * 1000}ms`;
    $input.value = '';
  });

  drawClockTime(whichClockIsActive());
};

// we export this function to execute it in the app file,but also can be can executed in here.
export const clock = () => {
  let refInterval = null;
  const $ul = document.getElementById('ul');
  const $contBtns = document.getElementById('container-btns');
  const $clockBtn = document.getElementById('clock__btn');

  // return true or false depending on if the clock active has time to count down or not.
  const hasClockTime = () => {
    if (whichClockIsActive() === 'work') return workTimeStamp <= 0 ? false : true;
    else if (whichClockIsActive() === 'short-break') return shortBreakTimeStamp <= 0 ? false : true;
    else if (whichClockIsActive() === 'long-break') return longBreakTimeStamp <= 0 ? false : true;
  };

  // start the countdown for the clock active..
  const startClock = () => {
    document.getElementById(`circle--${whichClockIsActive()}`).dataset.state = 'started';
    $clockBtn.dataset.action = 'pause';
    $clockBtn.textContent = 'pause';
    const activeCircle = document.querySelector('.clock__svg-circle--active');
    activeCircle.classList.add('clock__svg-circle--start');
    activeCircle.classList.remove('clock__svg-circle--paused');
    refInterval = setInterval(() => runClock(whichClockIsActive()), 1000);
    setActive('.container-btns__btn', 'start');
  };

  // pause the count down for the clock active.
  const pauseClock = () => {
    document.getElementById(`circle--${whichClockIsActive()}`).dataset.state = 'paused';
    $clockBtn.dataset.action = 'start';
    $clockBtn.textContent = 'start';
    const activeCircle = document.querySelector('.clock__svg-circle--active');
    activeCircle.classList.remove('clock__svg-circle--start');
    activeCircle.classList.add('clock__svg-circle--paused');
    clearInterval(refInterval);
    setActive('.container-btns__btn', 'pause');
  };

  const setActive = (className, value) => {
    if (className.includes('li')) document.querySelectorAll(className).forEach($element => $element.classList.toggle('active', $element.dataset.clock === value));
    else if (className.includes('btn')) document.querySelectorAll(className).forEach($element => $element.classList.toggle('active', $element.dataset.action === value));
  };

  // cancel the countdown of all clocks.
  const cancelClock = () => {
    $clockBtn.textContent = 'pause';
    const activeCircle = document.querySelector('.clock__svg-circle--active');
    activeCircle.classList.remove('clock__svg-circle--start');
    activeCircle.classList.add('clock__svg-circle--paused');
    clearInterval(refInterval);
    setActive('.container-btns__btn', 'pause');
    document.querySelectorAll('circle').forEach($circle => {
      $circle.style.animationDuration = `0s`;
      $circle.dataset.state = 'paused';
    });
    $clockTime.textContent = '00:00';
    workTimeStamp = 0;
    shortBreakTimeStamp = 0;
    longBreakTimeStamp = 0;
  };

  // this function can start or pause the clock active depending on if the clock active has time to count down.
  const clockAction = e => {
    if (hasClockTime()) {
      let clockActive = document.getElementById(`circle--${whichClockIsActive()}`);
      if (e.target.dataset.action === 'start' && clockActive.dataset.state === 'paused') startClock();
      else if (e.target.dataset.action === 'pause' && clockActive.dataset.state === 'started') pauseClock();
    } else showSpanError('.span-error');
  };

  // this function subtracts 1000ms in a timeStamp depending on which clock you passed it and also it draws the DOM with the timeStamp of the clock did you passed it.
  const runClock = clockToCountDown => {
    if (workTimeStamp > 0 && clockToCountDown === 'work') workTimeStamp -= 1000;
    else if (shortBreakTimeStamp > 0 && clockToCountDown === 'short-break') shortBreakTimeStamp -= 1000;
    else if (longBreakTimeStamp > 0 && clockToCountDown === 'long-break') longBreakTimeStamp -= 1000;
    else clearInterval(refInterval);
    drawClockTime(clockToCountDown);
  };

  // for the events of each li element. work, short break and long break
  $ul.addEventListener('click', e => {
    if (e.target.classList.contains('ul-li') && e.target.dataset.clock !== whichClockIsActive()) {
      if (e.target === document.getElementById('work-btn')) setActive('li.ul-li', 'work');
      else if (e.target === document.getElementById('short-break-btn')) setActive('li.ul-li', 'short-break');
      else if (e.target === document.getElementById('long-break-btn')) setActive('li.ul-li', 'long-break');
      pauseClock();
      drawClockTime(whichClockIsActive());
    }
  });

  // for the events of each btn element. start, pause and cancel.
  $contBtns.addEventListener('click', e => {
    if (e.target.dataset.action === 'start' || e.target.dataset.action === 'pause') clockAction(e);
    else if (e.target === document.getElementById('cancel-btn') && (workTimeStamp > 0 || shortBreakTimeStamp > 0 || longBreakTimeStamp > 0)) cancelClock();
  });

  // event of the clock btn.
  document.getElementById('clock__btn').addEventListener('click', e => clockAction(e));
};
