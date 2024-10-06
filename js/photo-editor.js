const smallerButton = document.querySelector('.scale__control--smaller');
const biggerButton = document.querySelector('.scale__control--bigger');
const scaleValue = document.querySelector('.scale__control--value');
const previewImage = document.querySelector('.img-upload__preview img');
const hiddenScaleInput = document.querySelector('input[name="scale"]');

// начальные значения
let currentScale = 100; 

//обновление масштаба
const updateScale = () => {
  scaleValue.value = `${currentScale}%`;
  previewImage.style.transform = `scale(${currentScale / 100})`;
  hiddenScaleInput.value = currentScale; 
};

//уменьшение
smallerButton.addEventListener('click', () => {
  if (currentScale > 25) {
    currentScale -= 25;
    updateScale();
  }
});

// увеличение
biggerButton.addEventListener('click', () => {
  if (currentScale < 100) {
    currentScale += 25;
    updateScale();
  }
});

// отображение масштаба при загрузке страницы
updateScale();

document.addEventListener('DOMContentLoaded', () => {
  const effectLevelInput = document.querySelector('.effect-level__value');
  const effectLevelSlider = document.querySelector('.effect-level__slider');
  const effectsRadios = document.querySelectorAll('.effects__radio');
  
  // эффекты изображения
  const effects = {
    chrome(value) {
      return `grayscale(${value})`;
    },
    sepia(value) {
      return `sepia(${value})`;
    },
    marvin(value) {
      return `invert(${value * 100}%)`;
    },
    phobos(value) {
      return `blur(${value * 3}px)`;
    },
    heat(value) {
      return `brightness(${value * 3})`;
    },
  };
  

  //функция для обновления эффекта
  const updateEffect = (effect) => {
    previewImage.className = 'img-upload__preview'; // сбрасываем классы эффектов
    if (effects[effect]) {
      previewImage.style.filter = effects ; // применяем эффект с начальным значением
      effectLevelSlider.style.display = 'block';
    } else {
      previewImage.style.filter = ''; // убираем эффект
      effectLevelSlider.style.display = 'none';
    }
  };

  //инициализация слайдера
  noUiSlider.create(effectLevelSlider, {
    range: { min: 0, max: 1 },
    start: 1,
    step: 0.1,
    connect: [true, false]
  });

  // устанавливаем эффект по умолчанию
  updateEffect('none');
  effectLevelInput.value = '';

  //изменение эффекта
  effectsRadios.forEach((radio) => {
    radio.addEventListener('change', (evt) => {
      const selectedEffect = evt.target.value;
      updateEffect(selectedEffect);
  
      if (selectedEffect === 'none') {
        effectLevelInput.value = '';
        effectLevelSlider.noUiSlider.set(0);
      } else {
        effectLevelInput.value = '1';
        effectLevelSlider.noUiSlider.set(1);
      }
    });
  });
  

  // изменение интенсивности эффекта
  effectLevelSlider.noUiSlider.on('update', (values) => {
    let selectedEffect;
    
    // проходим по всем радиокнопкам и находим ту, которая выбрана
    effectsRadios.forEach((radio) => {
      if (radio.checked) {
        selectedEffect = radio.value;
      }
    });
  
    effectLevelInput.value = values[0];
    
    // применяем фильтр, если эффект существует
    if (effects[selectedEffect]) {
      previewImage.style.filter = effects[selectedEffect](values[0]);
    } else {
      previewImage.style.filter = 'none';
    }
  });
});  
