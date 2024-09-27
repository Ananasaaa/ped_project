export function openModal(photo) {
    const bigPicture = document.querySelector('.big-picture');

    bigPicture.classList.remove('hidden'); 
    bigPicture.querySelector('.big-picture__img img').src = photo.url;
    bigPicture.querySelector('.likes-count').textContent = photo.likes;
    bigPicture.querySelector('.comments-count').textContent = photo.comments.length;
    bigPicture.querySelector('.social__caption').textContent = photo.description;

    const commentsList = bigPicture.querySelector('.social__comments');
    commentsList.innerHTML = '';
    photo.comments.forEach((comment) => {
        const commentElement = document.createElement('li');
        commentElement.classList.add('social__comment');
        commentElement.innerHTML = `<img class="social__picture" src="${comment.avatar}" alt="${comment.name}" width="35" height="35">
            <p class="social__text">${comment.message}</p>`;
        commentsList.appendChild(commentElement);
    });
    document.addEventListener('keydown', onEscPress);
    bigPicture.querySelector('.big-picture__cancel').addEventListener('click', closeModal);
}
function closeModal() {
    const bigPicture = document.querySelector('.big-picture');
    bigPicture.classList.add('hidden');
    document.removeEventListener('keydown', onEscPress);
}

function onEscPress(evt) {
    if (evt.key === 'Escape') {
        closeModal();
    }
}