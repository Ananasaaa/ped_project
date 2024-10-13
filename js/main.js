import { generatePhotos } from './helpers.js';
import { renderPhotos } from './function.js';
import { openModal } from './modal.js'; 


export const photosArray = generatePhotos();

const pictures = document.querySelector('.pictures');

const photoCollection = renderPhotos(photosArray);
pictures.appendChild(photoCollection);

// task 3
pictures.addEventListener('click', (evt) => {
  const target = evt.target.closest('.picture'); // ищем элемент с классом .picture
  if (target) {
    const photoId = parseInt(target.dataset.id, 10); // получаем id фотографии
    const photo = photosArray.find((item) => item.id === photoId); // находим фото по id
    openModal(photo); 
  }
});