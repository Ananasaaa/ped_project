export function openModal(photo) {
    const bigPicture = document.querySelector('.big-picture');
    
    bigPicture.classList.remove('hidden'); 
    bigPicture.querySelector('.big-picture__img img').src = photo.url;
    bigPicture.querySelector('.likes-count').textContent = photo.likes;
    bigPicture.querySelector('.social__caption').textContent = photo.description;
    const commentCountBlock = bigPicture.querySelector('.social__comment-count');
    const commentsLoader = bigPicture.querySelector('.comments-loader');
    commentCountBlock.classList.remove('hidden');
    commentsLoader.classList.remove('hidden');
    
    const commentsList = bigPicture.querySelector('.social__comments');
    commentsList.innerHTML = '';
    
    // текущий индекс комментариев
    let currentCommentIndex = 0;
    const commentsPerPage = 5;
    
    const renderComments = () => {
    const commentsToShow = photo.comments.slice(currentCommentIndex, currentCommentIndex + commentsPerPage);
    commentsToShow.forEach((comment) => {
        const commentElement = document.createElement('li');
        commentElement.classList.add('social__comment');
        commentElement.innerHTML = `<img class="social__picture" src="${comment.avatar}" alt="${comment.name}" width="35" height="35">
         <p class="social__text">${comment.message}</p>`;
        commentsList.appendChild(commentElement);
    });
    
    // обновляем счетчик комментариев
    const displayedCommentsCount = Math.min(currentCommentIndex + commentsToShow.length, photo.comments.length);
    
    // скрываем или показываем счетчик комментариев в зависимости от количества
     if (photo.comments.length > 5) {
        commentCountBlock.textContent = `${displayedCommentsCount} из ${photo.comments.length} комментариев`;
    } else {
        commentCountBlock.classList.add('hidden'); // Скрываем, если 5 или меньше комментариев
    }
    
      // если больше нет комментариев, скрываем кнопку загрузки
      if (currentCommentIndex + commentsPerPage >= photo.comments.length) {
        commentsLoader.classList.add('hidden');
     } else {
        commentsLoader.classList.remove('hidden');
    }
    };
    
    // начальное отображение комментариев
    renderComments();
    
    // обработчик для кнопки загрузки дополнительных комментариев
    commentsLoader.addEventListener('click', () => {
    currentCommentIndex += commentsPerPage;
     renderComments();
     });
    
    document.addEventListener('keydown', onEscPress);
    bigPicture.querySelector('.big-picture__cancel').addEventListener('click', closeModal);
    }
