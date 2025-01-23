import $ from 'jquery';
import './style.scss';

$('#main').html('Here we go!');

let num = 0;

const updateTime = () => {
  const mainElement = document.querySelector('#main');
  if (mainElement) {
    mainElement.textContent = `You've been on this page for ${num} seconds.`;
  }
  // eslint-disable-next-line no-plusplus
  num++;
};

setInterval(updateTime, 1000);
