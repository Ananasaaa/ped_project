import { commentsText, names, descriptions } from './constants.js';
import { getRandomNumber } from './utils.js'

const createComment = () => {
    return {
        id: getRandomNumber(1, 100),
        avatar: `img/avatar-${getRandomNumber(1, 6)}.svg`,
        message: commentsText[getRandomNumber(0, commentsText.length - 1)],
        name: names[getRandomNumber(0, names.length - 1)]
    };
};

const generateComments = () => {
    const commentsCount = getRandomNumber(0, 100);
    return new Array(commentsCount).fill(null).map(createComment);
};

export const createPhoto = (id) => {
    const randomDescription = descriptions[getRandomNumber(0, descriptions.length - 1)];
    return {
        id: id,
        url: `photos/${id}.jpg`,
        description: randomDescription,
        likes: getRandomNumber(15, 200),
        comments: generateComments()
    };
}; 

export const generatePhotos = () => {
    return new Array(25).fill(null).map((_, index) => createPhoto(index + 1));
};


