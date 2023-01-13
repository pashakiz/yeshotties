import * as Timer from './countdown.js';
import Splide from '@splidejs/splide';
import '@splidejs/splide/css/core';
//import '@splidejs/splide/css';
import '@scss/main.scss'

//init countdown.js
document.addEventListener('DOMContentLoaded', Timer.initCountDown);

//preloader
const preloader = () => {
  setTimeout(function () {
    let preloader = document.body.querySelector('#page-preloader');
    if (!preloader)
      return false
    if (!preloader.classList.contains('done'))
      preloader.classList.add('done');
  }, 1000);
}
document.addEventListener('DOMContentLoaded', preloader, false);

//upload photo
const uploadPhotoInput = document.querySelector('.custom-file-input');
const profilePhoto = document.querySelector('.settings-photo .profile-photo');
const uploadPhoto = () => {
  let url = 'assets/img/photos/ava.jpg';
  profilePhoto.style.backgroundImage = 'url(' + url + ')';
  console.log('uploadPhoto');
}
if (!!uploadPhotoInput)
  uploadPhotoInput.addEventListener('change', uploadPhoto, false);


// Splidejs (cursor customisation)
const splides = document.querySelectorAll('.splide');

const splideIsDrag = (e) => {
  if (e.target.closest('.splide') === null)
    return false
  e.target.closest('.splide').classList.add('is-grab');
}

const splideIsntDrag = (e) => {
  if (e.target.closest('.splide') === null)
    return false
  e.target.closest('.splide').classList.remove('is-grab');
}

if (!!splides) {
  splides.forEach(el => el.addEventListener('mousedown', splideIsDrag, false));
  splides.forEach(el => el.addEventListener('mouseup', splideIsntDrag, false));
}

// Splidejs
// https://github.com/Splidejs/splide

if (document.querySelector('.splide_up') !== null) {
  new Splide( '.splide_up', {
    type       : 'loop',
    arrows     : false,
    autoHeight : true,
    perPage    : 1,
  } ).mount();
}

if (document.querySelector('.splide_ulist') !== null) {
  new Splide( '.splide_ulist', {
    type       : 'loop',
    arrows     : false,
    autoHeight : true,
    autoWidth  : true,
    gap        : '60px',
    //perPage    : 4,
    breakpoints: {
      992: {
        gap    : '10px',
      },
    },
  } ).mount();
}

if (document.querySelector('.splide_ulist-extra') !== null) {
  new Splide( '.splide_ulist-extra', {
    type       : 'loop',
    arrows     : false,
    autoHeight : true,
    autoWidth  : true,
    gap        : '60px',
    //perPage    : 4,
    breakpoints: {
      992: {
        gap    : '10px',
      },
    },
  } ).mount();
}

if (document.querySelector('.splide_fback') !== null) {
  new Splide( '.splide_fback', {
    type       : 'loop',
    arrows     : false,
    autoHeight : true,
    autoWidth  : true,
    gap        : '70px',
    breakpoints: {
      992: {
        gap    : '23px',
      },
    },
  } ).mount();
}
