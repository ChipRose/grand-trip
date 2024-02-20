// Функция из интернета по генерации случайного числа из диапазона
// Источник - https://github.com/you-dont-need/You-Dont-Need-Lodash-Underscore#_random
const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

const getRandPartArray = (array) => {
  const newArray = [];

  for (let item of array) {
    if (getRandomInteger()) newArray.push(item);
  }

  return newArray;
}

const getRandItemArray = (array) => (array[getRandomInteger(0, array?.length-1)]);

export { getRandomInteger, getRandPartArray, getRandItemArray };
