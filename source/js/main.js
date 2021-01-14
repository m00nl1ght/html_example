'use strict';
// //выпадающее меню планшет/мобильник

const menuButtonElem = document.querySelector('.js-menu-button');
const menuListElem = document.querySelector('.js-menu-list');

menuButtonElem.addEventListener('click', () => {
  menuListElem.classList.toggle('header-main__menu-list_hidden');
});




//плавный скролл
const anchors = document.querySelectorAll('a[href*="#"]')

for (let anchor of anchors) {
  anchor.addEventListener('click', function (e) {
    e.preventDefault()
    
    const blockID = anchor.getAttribute('href').substr(1)
    
    document.getElementById(blockID).scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    })
  })
}

