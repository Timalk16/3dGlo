'use strict';

const renameText = function(n, textForms) {
  n = Math.abs(n) % 100; const n1 = n % 10;
  if (n > 10 && n < 20) { return textForms[2]; }
  if (n1 > 1 && n1 < 5) { return textForms[1]; }
  if (n1 === 1) { return textForms[0]; }
  return textForms[2];
};


const whatTimeofDay = date => {
  const hour = date.getHours();
  let timeOfDay;
  switch (true) {
  case (hour >= 11 && hour <= 17):
    timeOfDay = 'Добрый день!';
    break;
  case (hour >= 5 && hour < 11):
    timeOfDay = 'Доброе утро!';
    break;
  case (hour > 17 && hour <= 23):
    timeOfDay = 'Добрый вечер!';
    break;
  case (hour > 23 || (hour >= 0 && hour < 5)):
    timeOfDay = 'Доброй ночи!';
    break;
  }
  return timeOfDay;
};


const reformateDate = date => {
  const options = {
    weekday: 'long',
  };
  let day = date.toLocaleString("ru", options);
  day = day[0].toUpperCase() + day.substr(1).toLowerCase();
  return day;
};


const countDays = (nextdate, currentDate) => {
  const newdate = new Date(nextdate);
  return Math.floor((newdate - currentDate) / 1000 / 60 / 60 / 24);
};
const date = new Date();
const currentDay = reformateDate(date);
const remainingDays = countDays('1 January 2021', date);
const itemText = document.createElement('div');
const spanTime = document.createElement('span');

itemText.innerHTML = `<div>${whatTimeofDay(date)}</div>
                      <div>Сегодня: ${currentDay}</div>
                      <span class="timeText">Текущее время:</span> 
                      <div>До нового года осталось 
                      ${remainingDays} ${renameText(remainingDays, ['день', 'дня', 'дней'])}</div>
                    `;
document.body.append(itemText);

const intervalTime = () => {
  const time = new Date().toLocaleTimeString("en");
  spanTime.textContent = time;
  itemText.querySelector('.timeText').insertAdjacentElement('afterend', spanTime);
};
intervalTime();
setInterval(intervalTime, 1000);