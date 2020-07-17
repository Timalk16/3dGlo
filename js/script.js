window.addEventListener('DOMContentLoaded', function() {
    'use strict';

    //timer
    const countTimer = (deadline) => {
        let timerHours = document.querySelector('#timer-hours'),
            timerMinutes = document.querySelector('#timer-minutes'),
            timerSeconds = document.querySelector('#timer-seconds'),
            timeInterval = setInterval(updateClock, 1000);



        const getTimeRemaining = () => {  
            let dateStop = new Date(deadline).getTime(),
            dateNow = new Date().getTime(),
            timeRemaining = (dateStop - dateNow) / 1000,
            seconds = Math.floor(timeRemaining % 60),
            minutes = Math.floor((timeRemaining / 60) % 60),
            hours = Math.floor(timeRemaining / 60 / 60);
            return {timeRemaining, hours, minutes, seconds}
        };
       
        const zero = (num) => {
            if (num <= 9) {
                return '0' + num;
              } else {
                return num;
              }
        };

        function updateClock() {
            let timer = getTimeRemaining();
            timerHours.textContent = zero(timer.hours);
            timerMinutes.textContent = zero(timer.minutes);
            timerSeconds.textContent = zero(timer.seconds);

            if(timer.timeRemaining <= 0) {
                clearInterval(timeInterval);
                timerHours.textContent = '00';
                timerMinutes.textContent = '00';
                timerSeconds.textContent = '00';
            }
        }
    };
    countTimer('18 july 2020');

    //menu
    const toggleMenu = () => {
        const btnMenu = document.querySelector('.menu'),
              menu = document.querySelector('menu'),
              closeBtn = document.querySelector('.close-btn'),
              menuItems = menu.querySelectorAll('ul>li');

              const handlerMenu = () => {
                menu.classList.toggle('active-menu');
              };
              btnMenu.addEventListener('click', handlerMenu);
              closeBtn.addEventListener('click', handlerMenu);


              menuItems.forEach((elem) => {
                elem.addEventListener('click', handlerMenu);
              });
    };

    toggleMenu();

    //popup
    const togglePopup = () => {
        const popup = document.querySelector('.popup'),
              popupBtn = document.querySelectorAll('.popup-btn'),
              popupClose = document.querySelector('.popup-close');

              popupBtn.forEach((elem) => {
                elem.addEventListener('click', () => {
                  let showAnimate;
                  let count = 0;
                    popup.style.display = 'block';
                    const show = () => {
                      showAnimate = requestAnimationFrame(show);
                      count += 0.06;
                      if (count <= 1) {
                        popup.style.opacity = count;
                      } else {
                        cancelAnimationFrame(showAnimate);
                      }
                    };
                    if (window.innerWidth < 768) {
                      popup.style.opacity = 100;
                    } else {
                      showAnimate = requestAnimationFrame(show);
                    }
                });
              });

              popupClose.addEventListener('click', () => {
                popup.style.display = 'none';
              });
    };
    togglePopup();

});