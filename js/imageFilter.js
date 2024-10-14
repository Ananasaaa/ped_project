import { photosArray } from "./main.js";
import { makePhoto } from "./function.js";

const imgFilters = document.querySelector('.img-filters');
imgFilters.classList.remove('img-filters--inactive');

const filterDefault = document.querySelector('#filter-default');
const filterRandom = document.querySelector('#filter-random');
const filterDiscussed = document.querySelector('#filter-discussed');

//очистка текущих фотографий
function clearPhotos() {
  const photoContainer = document.querySelector('.pictures');
  photoContainer.innerHTML = '';
}

//отображения фотографий
function showPhotos(photos) {
  const photoContainer = document.querySelector('.pictures');
  const fragment = document.createDocumentFragment();

  photos.forEach(photo => {
    const photoElement = makePhoto(photo); 
    fragment.appendChild(photoElement);
  });

  photoContainer.appendChild(fragment);
}

//получения 10 случайных фотографий
function getRandomPhotos(photos) {
  const shuffled = photos.slice().sort(() => 0.5 - Math.random()); 
  return shuffled.slice(0, 10); 
}

// сортировка по количеству комментариев
function getDiscussedPhotos(photos) {
  return photos.slice().sort((a, b) => b.comments.length - a.comments.length);
}

// обработчики фильтров
filterDefault.addEventListener('click', () => {
  clearPhotos();
  showPhotos(photosArray); 
});

filterRandom.addEventListener('click', () => {
  clearPhotos();
  const randomPhotos = getRandomPhotos(photosArray);
  showPhotos(randomPhotos);
});

filterDiscussed.addEventListener('click', () => {
  clearPhotos();
  const discussedPhotos = getDiscussedPhotos(photosArray);
  showPhotos(discussedPhotos);
});




