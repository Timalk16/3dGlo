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
      const menu = document.querySelector('menu');
      const handlerMenu = () => {
        menu.classList.toggle('active-menu');
      };
      document.body.addEventListener('click', event => {
        const target = event.target;
        if (target.classList.contains('close-btn') || target.closest('menu li') || target.closest('.menu')) {
          handlerMenu();
        } else if (target.tagName !== 'MENU') {
          menu.classList.remove('active-menu');
        }
      });
    };

    toggleMenu();

    //popup
    const togglePopup = () => {
        const popup = document.querySelector('.popup'),
              popupBtn = document.querySelectorAll('.popup-btn');


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


              popup.addEventListener('click', event => {
                let target = event.target;
                if (target.classList.contains('popup-close')) {
                  popup.style.opacity = 0;
                  popup.style.visibility = 'hidden';
                } else {
                  target = target.closest('.popup-content');
                  if (!target) {
                    popup.style.opacity = 0;
                    popup.style.visibility = 'hidden';
                  }
                }
              });
    };
    togglePopup();

    //tabs
    const tabs = () => {
      const tabHeader = document.querySelector('.service-header'),
            tab = tabHeader.querySelectorAll('.service-header-tab'),
            tabContent = document.querySelectorAll('.service-tab');

            const toggleTabContent = index => {
              for(let i = 0; i < tabContent.length; i++) {
                if (index === i) {
                  tab[i].classList.add('active');
                  tabContent[i].classList.remove('d-none');
                } else {
                  tab[i].classList.remove('active');
                  tabContent[i].classList.add('d-none');
                }
              }
            };
            tabHeader.addEventListener('click', (event) => {
              let target = event.target;
              target = target.closest('.service-header-tab');
              if (target) {
                tab.forEach((item, i) => {
                  if(item === target) {
                    toggleTabContent(i);
                  }
                });
              }
            });
    };
    tabs();
    
     //slider
  const slider = () => {
    const slide = document.querySelectorAll('.portfolio-item'),
          dotsList = document.querySelector('.portfolio-dots'),
          slider = document.querySelector('.portfolio-content');

    let currentSlide = 0, 
      interval;
    
    const addDots = () => {
      for (let i = 0; i < slide.length; i++) {
        const dot = document.createElement('li');
        dot.classList.add('dot');
        dotsList.append(dot);
      }
    };
    addDots();
    const dot = document.querySelectorAll('.dot');

    const prevSlide = (elem, index, strClass) => {
      elem[index].classList.remove(strClass);
    };

    const nextSlide = (elem, index, strClass) => {
      elem[index].classList.add(strClass);
    };

    const autoPlaySlide = () => {
      prevSlide(slide, currentSlide, 'portfolio-item-active');
      prevSlide(dot, currentSlide, 'dot-active');
      currentSlide++;
      if (currentSlide >= slide.length) {
        currentSlide = 0;
      }
      nextSlide(slide, currentSlide, 'portfolio-item-active');
      nextSlide(dot, currentSlide, 'dot-active');
    };

    const startSlide = (time = 3000) => {
      interval = setInterval(autoPlaySlide, time);
    };

    const stopSlide = () => {
      clearInterval(interval);
    };

    slider.addEventListener('click', event => {
      event.preventDefault();
      const target = event.target;

      if (!target.matches('.portfolio-btn, .dot')) {
        return;
      }
      prevSlide(slide, currentSlide, 'portfolio-item-active');
      prevSlide(dot, currentSlide, 'dot-active');

      if (target.matches('#arrow-right')) {
        currentSlide++;
      } else if (target.matches('#arrow-left')) {
        currentSlide--;
      } else if (target.matches('.dot')) {
        dot.forEach((item, index) => {
          if (item === target) {
            currentSlide = index;
          }
        });
      }
      if (currentSlide >= slide.length) {
        currentSlide = 0;
      }
      if (currentSlide < 0) {
        currentSlide = slide.length - 1;
      }
      nextSlide(slide, currentSlide, 'portfolio-item-active');
      nextSlide(dot, currentSlide, 'dot-active');

    });

    slider.addEventListener('mouseover', event => {
      if (event.target.matches('.portfolio-btn') || event.target.matches('.dot')) {
        stopSlide();
      }
    });

    slider.addEventListener('mouseout', event => {
      if (event.target.matches('.portfolio-btn') || event.target.matches('.dot')) {
        startSlide();
      }
    });
    startSlide(1500);
  };
  slider();

});