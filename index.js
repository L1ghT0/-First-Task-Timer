const inputEl = document.querySelector('input');
const buttonEl = document.querySelector('button');
const timerEl = document.querySelector('span');
// Напишите реализацию createTimerAnimator
// который будет анимировать timerEl
const createTimerAnimator = () => {
  return (seconds) => {

    let hours = 0;
    let minutes = 0;
    let secs = seconds < 0 ? 0 : seconds;

    if(seconds > 59){
      minutes = Math.floor(seconds/60);
      secs = seconds - minutes*60;
    }
    if(minutes > 59){
      hours = Math.floor(minutes/60);
      minutes = minutes - hours*60;
    }
    if(hours > 99){
      hours = 99;
      minutes = 59;
      secs = 59;
    }
    timerEl.innerHTML = `${hours >= 10 ? hours : '0'+hours}:${minutes >= 10 ? minutes : '0'+minutes}:${secs >= 10 ? secs : '0'+secs}`;
    let timerId = setInterval(function() {

      if(hours === 0 && minutes === 0 && secs === 0){
        buttonEl.disabled = false;
        clearInterval(timerId);
        return;
      }
      secs--;
      if(secs < 0){
        minutes--;
        secs = 59;
      }
      if(hours && minutes < 0){
        hours--;
        minutes = 59;
        secs = 59;
      }
      timerEl.innerHTML = `${hours >= 10 ? hours : '0'+hours}:${minutes >= 10 ? minutes : '0'+minutes}:${secs >= 10 ? secs : '0'+secs}`;
    }, 1000);

  };
};

const animateTimer = createTimerAnimator();

inputEl.addEventListener('input', (e) => {
  // Очистите input так, чтобы в значении
  // оставались только числа
  let inputELvalue = e.target.value;

  if(!isNumeric(inputELvalue)){
    e.target.value = getNumbersOfString(inputELvalue);
  }
});

buttonEl.addEventListener('click', () => {
  const seconds = Number(inputEl.value);

  animateTimer(seconds);
  buttonEl.disabled = true;

  inputEl.value = '';
});


function isNumeric(str) {
  if (typeof str != "string") {
    return false
  }
  return !isNaN(str) && !isNaN(parseFloat(str))
}

function getNumbersOfString(str){
  const NUMERIC_REGEXP  = /\d+/g;
  if(!str.match(NUMERIC_REGEXP)){
    return '';
  }
  return str.match(NUMERIC_REGEXP).join('');
}
