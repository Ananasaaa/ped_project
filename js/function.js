export function makePhoto(photo) {
    const pictureTemplate = document.querySelector('#picture').content.cloneNode(true);
    pictureTemplate.querySelector('img').src = photo.url;
    pictureTemplate.querySelector('.picture__comments').innerText = photo.comments.length;
    pictureTemplate.querySelector('.picture__likes').innerText = photo.likes;
    return pictureTemplate;
}

export function renderPhotos(photos) {
    const fragment = document.createDocumentFragment();
    photos.forEach((photo) => {
        const photoElement = makePhoto(photo);
        fragment.appendChild(photoElement);
    });
    return fragment;
}


