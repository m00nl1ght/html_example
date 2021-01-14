'use strict';

// вызов модальной формы
const modalElem = document.querySelector('.js-modal');
const modalCloseButtonElem = document.querySelector('.js-modal__close-button');
const modalOpenButtonElem = document.querySelectorAll('.js-modal__open-button');
const modalOverlayElem = document.querySelector('.js-modal__overlay');
const bodyElem = document.querySelector('.js-body');
const modalMessageElem = document.querySelector('.js-modal__message');
const modalFormElem = document.querySelector('.js-modal-form');

const successMessage = 'Ваш запрос отправлен';

modalOpenButtonElem.forEach(element => {
    element.addEventListener('click', () => {
        modalElem.classList.toggle('modal_closed');
        modalElem.setAttribute('aria-modal', 'true');
        modalFormElem.classList.remove('visually-hidden'); 
        modalOverlayElem.classList.toggle('modal_closed');
        bodyElem.classList.toggle('modal_stop-scroll');
        modalMessageElem.classList.add('visually-hidden');
    });
});

modalOverlayElem.addEventListener('click', () => {
    if(event.target === modalOverlayElem || event.target === modalCloseButtonElem){
        modalElem.classList.toggle('modal_closed');
        modalElem.setAttribute('aria-modal', 'false');
        modalOverlayElem.classList.toggle('modal_closed');
        bodyElem.classList.toggle('modal_stop-scroll');
    }
});

modalFormElem.addEventListener('submit', (elem) => {
    event.preventDefault();

    modalMessageElem.classList.remove('visually-hidden');
    modalMessageElem.innerHTML = successMessage;
    modalFormElem.classList.add('visually-hidden');
    
    modalFormElem.reset();
});