document.addEventListener('DOMContentLoaded', () => {
  const stopBtn = document.querySelector('.btn-stop');
  const resetBtn = document.querySelector('.btn-reset');
  const progressLine = document.getElementById('progres-line');
  let id;
  let interval;
  let width;

  const startProgress = () => {
    if (id !== undefined) {
      clearInterval(id);
      width = 0;
      progressLine.style.width = '0%';
      progressLine.style.backgroundColor = '#0675d3';
      id = setInterval(moveProgress, interval);
    }
    else if(!id) {
      id = setInterval(moveProgress, interval);
    }
  }

  const moveProgress = () => {
    if (width >= 100) {
      progressLine.style.backgroundColor = '#30e60b';
      clearInterval(id);
    } else {
      width++;
      progressLine.style.width = width + '%';
    }
  }

  stopBtn.addEventListener('click', e => {
    e.preventDefault();
    browser.runtime.sendMessage({ 'stop': 'true' });
    width = 100;
    progressLine.style.width = '100%';
    progressLine.style.backgroundColor = '#30e60b';
  });

  resetBtn.addEventListener('click', e => {
    e.preventDefault();
    browser.runtime.sendMessage({ 'reset': 'true' });
    progressLine.style.width = '0%';
    progressLine.style.backgroundColor = '#0675d3';
    startProgress();
  });

  browser.runtime.sendMessage({'time': 'true'})
  .then((response) => {
    width = response.width;
    interval = response.interval;
    startProgress();
  })
})
