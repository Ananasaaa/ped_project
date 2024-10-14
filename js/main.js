import { generatePhotos } from './helpers.js';
import { renderPhotos } from './function.js';

const photosArray = generatePhotos();

const pictures = document.querySelector('.pictures');

const photoCollection = renderPhotos(photosArray);
pictures.appendChild(photoCollection);
