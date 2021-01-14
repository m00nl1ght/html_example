'use strict';
// //слайдер
  
    /* lazy loading and button controls */
    const gallery = document.querySelector('.js-slider');
    const slidesElem = document.querySelectorAll('.js-slider__item');
    const sliderListElem = document.querySelector('.js-slider__list');  
    const nextButtonElem = document.querySelector('.js-slider__button_next');
    const previousButtonElem = document.querySelector('.js-slider__button_previous');

    const observerSettings = {
      root: gallery,
      rootMargin: '-10px'
    }
  
    if ('IntersectionObserver' in window) {
      const callback = (slides, observer) => {
        Array.prototype.forEach.call(slides, function(entry) {
          entry.target.classList.remove('visible')
          if (!entry.intersectionRatio > 0) {
            return
          }
          let img = entry.target.querySelector('img')
          if (img.dataset.src)  {
            img.setAttribute('src', img.dataset.src)
            img.removeAttribute('data-src')
          }
          entry.target.classList.add('visible')
        })
      }
  
      const observer = new IntersectionObserver(callback, observerSettings)
      Array.prototype.forEach.call(slidesElem, t => observer.observe(t))
  
      function scrollIt (slideToShow) {
        let scrollPos = Array.prototype.indexOf.call(slidesElem, slideToShow) * (sliderListElem.scrollWidth / slidesElem.length);

        sliderListElem.scrollLeft = scrollPos;
      }
  
      function showSlide (dir, slides) {
        const visibleElem = document.querySelectorAll('.js-slider .visible')
        const i = dir === 'previous' ? 0 : 1
  
        if (visibleElem.length > 3) {
          scrollIt(visibleElem[i])
        } else {
          const newSlide = i === 0 ? visibleElem[0].previousElementSibling : visibleElem[0].nextElementSibling
          if (newSlide) {
            scrollIt(newSlide)
          }
        }
      }

      previousButtonElem.addEventListener('click', function (e) {
        showSlide(e.target.closest('button').id, slidesElem);
      });

      nextButtonElem.addEventListener('click', function (e) {
        showSlide(e.target.closest('button').id, slidesElem);
      });
      
    } else {
      Array.prototype.forEach.call(slides, function (s) {
        let img = s.querySelector('img')
        img.setAttribute('src', img.getAttribute('data-src'))
      })
    }

  //маленькие кнопочки под слайдером
const smallSliderButtons = document.querySelectorAll('.js-examples-slider__navigate-item');

smallSliderButtons.forEach(element => {
  element.addEventListener('click', (elem) => {
    smallSliderButtons.forEach(e => e.classList.remove('examples-slider__navigate-item_checked'));

    elem.target.classList.add('examples-slider__navigate-item_checked');

    smallSliderButtons.forEach((elem, index) => {
      if(elem.classList.contains('examples-slider__navigate-item_checked')){
        slidesElem[index].scrollIntoView();
      }
    })
  })
})