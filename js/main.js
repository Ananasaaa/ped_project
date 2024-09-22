const commentsText = [
    'This picture is amazing!',
    'What a beautiful sunset!',
    'I love the colors in this photo.',
    'This place looks so peaceful.',
    'You captured the moment perfectly.',
    'This photo tells a story.',
    'I wish I were there.',
    'Stunning view!'
];

const names = ['John', 'Alex', 'Mary', 'Jake', 'Bill', 'Kate', 'Mike', 'Lola', 'George', 'Andy', 'Jessica'];

function getRandomNumber(min, max) {
    return Math.round(Math.random() * (max - min)) + min;
}

const createComment = () => {
    return {
        id: getRandomNumber(1, 100),
        avatar: `img/avatar-${getRandomNumber(1, 6)}.svg`,
        message: commentsText[getRandomNumber(0, commentsText.length - 1)],
        name: names[getRandomNumber(0, names.length - 1)]
    };
};

const generateComments = () => {
    const commentsCount = getRandomNumber(1, 3);
    return new Array(commentsCount).fill(null).map(createComment);
};

const createPhoto = (id) => {
    return {
        id: id,
        url: `photos/${id}.jpg`,
        description: `Photo description ${id}`,
        likes: getRandomNumber(15, 200),
        comments: generateComments()
    };
};

const generatePhotos = () => {
    return new Array(25).fill(null).map((index) => createPhoto(index + 1));
};

const photos = generatePhotos();
console.log(photos); 