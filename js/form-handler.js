const uploadFileInput = document.querySelector('#upload-file');
const uploadOverlay = document.querySelector('.img-upload__overlay');
const body = document.body;

// oбработчик выбора файла
uploadFileInput.addEventListener('change', () => {
  uploadOverlay.classList.remove('hidden');
  body.classList.add('modal-open');
}); 



const cancelButton = document.querySelector('#upload-cancel');

const closeUploadForm = () => {
  uploadOverlay.classList.add('hidden');
  body.classList.remove('modal-open');
  uploadFileInput.value = '';  // сбрасываем значение поля файла
  document.querySelector('#upload-select-image').reset();  // сброс формы
};

// закрытие по крестику
cancelButton.addEventListener('click', closeUploadForm);

// закрытие по клавише еsc
document.addEventListener('keydown', (evt) => {
  if (evt.key === 'Escape' || evt.key === 'Esc') {
    closeUploadForm();
  }
}); 


// получаем поля формы
const hashtagsInput = document.querySelector('.text__hashtags');
const commentInput = document.querySelector('.text__description');
const form = document.querySelector('.img-upload__form');


// функция для валидации хештегов
function validateHashtags() {
  const hashtagString = hashtagsInput.value.trim();
  
  if (!hashtagString) {
    hashtagsInput.setCustomValidity('');
    return; //хэштеги не обязателльны
  }

  const hashtags = hashtagString.toLowerCase().split(/\s+/); // разделяем по пробелам хэштеги
  const hashtagRegex = /^#[a-zA-Z0-9]{1,19}$/; // регулярка для проверки хештегов

  if (hashtags.length > 5) {
    hashtagsInput.setCustomValidity('You can\'t enter more than 5 hashtags');
    hashtagsInput.reportValidity(); // немедленно отображаем ошибку
    return;
  }
  
  // проверка уникальности и количества хештегов
  const uniqueHashtags = hashtags.filter((item, index, array) => array.indexOf(item) !== index);
  if (uniqueHashtags.length > 0) {
    hashtagsInput.setCustomValidity('The same hashtag cannot be used twice.');
    hashtagsInput.reportValidity(); // немедленно отображаем ошибку
    return;
  }

  // проверка каждого хештега на соответствие правилам
  for (let tag of hashtags) {
    if (tag[0] !== '#') {
      hashtagsInput.setCustomValidity('The hashtag must start with #.');
      hashtagsInput.reportValidity();
      return;
    }
    if (tag.length === 1) {
      hashtagsInput.setCustomValidity('The hashtag cannot consist only of #');
      hashtagsInput.reportValidity();
      return;
    }
    if (!hashtagRegex.test(tag)) {
      hashtagsInput.setCustomValidity('The hashtag must contain only letters and numbers and cannot be longer than 20 characters');
      return;
    }
  }
 
  hashtagsInput.setCustomValidity(''); //сброс ошибки валидации если хэшт корректные
}
hashtagsInput.addEventListener('input', validateHashtags); //при каждом изменении в инпуте вызываем фцию для проверки данных





// фция для валидации коммента
function validateComment() {
  const commentText = commentInput.value.trim();
  if (commentText.length > 140) {
    commentInput.setCustomValidity('The comment must not contain more than 140 characters');
  } else {
    commentInput.setCustomValidity('');
  }
}

// блокируем закрытие формы при нажатии Esc в полях хешт и комментов
hashtagsInput.addEventListener('keydown', (evt) => {
  if (evt.key === 'Escape') {
    evt.stopPropagation();
  }
});

commentInput.addEventListener('keydown', (evt) => {
  if (evt.key === 'Escape') {
    evt.stopPropagation();
  }
});

// при вводе проверяем корректность хэшт и коммент
hashtagsInput.addEventListener('input', validateHashtags);
commentInput.addEventListener('input', validateComment);

// обработчик отправки формы
form.addEventListener('submit', function(event) {
  event.preventDefault(); // предотвращаем стандартную отправку формы

  if (form.checkValidity()) {
    console.log('The form has successfully passed validation');
    //отправка на сервер
  } else {
    console.log('The form contains errors');
    form.reportValidity(); // ошибки
  }
}); 

