import Carousel from './carousel.js';

// This is the template we defined earlier in our HTML
const carouselControls = document.querySelector('#carousel-controls');

const carousel = new Carousel({
  root: document.querySelector('.carousel'),
  navigationControls: carouselControls.content.cloneNode(true),
});