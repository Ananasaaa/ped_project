import { max_comment_length, max_hashtag_length, max_hashtags } from "./constants.js";
const uploadFileInput = document.querySelector('#upload-file');
const uploadOverlay = document.querySelector('.img-upload__overlay');
const body = document.body;
const previewImage = document.querySelector('.img-upload__preview img'); // получаем элемент превью изображения


uploadFileInput.addEventListener('change', (evt) => {
  const file = evt.target.files[0]; // получаем файл
  if (file) {
    const reader = new FileReader();
    reader.onload = function(e) {
      previewImage.src = e.target.result; // устанавливаем загруженное изображение в превью
    };
    reader.readAsDataURL(file); // читаем файл как Data URL
  }

  uploadOverlay.classList.remove('hidden');
  body.classList.add('modal-open');
});
/*// oбработчик выбора файла
uploadFileInput.addEventListener('change', () => {
  uploadOverlay.classList.remove('hidden');
  body.classList.add('modal-open');
});  */



const cancelButton = document.querySelector('#upload-cancel');

const closeUploadForm = () => {
  uploadOverlay.classList.add('hidden');
  body.classList.remove('modal-open');
  uploadFileInput.value = '';  // сбрасываем значение поля файла
  document.querySelector('#upload-select-image').reset();  // сброс формы
  hashtagsInput.value = ''; // сброс значения хештегов
  commentInput.value = ''; // сброс значения комментария
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

  if (hashtags.length > max_hashtags) {
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
  const errors = hashtags.reduce((acc, tag) => {
    if (tag[0] !== '#') {
      acc.push('The hashtag must start with #.');
    } else if (tag.length > max_hashtag_length) {
      acc.push(`The hashtag cannot be longer than ${max_hashtag_length} characters.`);
    } else if (tag.length === 1 && tag === '#') {
        acc.push('The hashtag cannot consist only of #');
    } else if (!hashtagRegex.test(tag)) {
      acc.push('The hashtag must contain only letters and numbers and cannot be longer than 20 characters');
    }
    return acc;
  }, []);

  // если есть ошибки, отображаем первую ошибку
  if (errors.length > 0) {
    hashtagsInput.setCustomValidity(errors[0]);
    hashtagsInput.reportValidity();
    return;
  }
 
  hashtagsInput.setCustomValidity(''); //сброс ошибки валидации если хэшт корректные
}
hashtagsInput.addEventListener('input', validateHashtags); //при каждом изменении в инпуте вызываем фцию для проверки данных





// фция для валидации коммента
function validateComment() {
  const commentText = commentInput.value.trim();
  if (commentText.length > max_comment_length) {
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
