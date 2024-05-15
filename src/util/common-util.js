
// Функция из интернета по генерации случайного числа из диапазона
// Источник - https://github.com/you-dont-need/You-Dont-Need-Lodash-Underscore#_random
export const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

export const getRandPartArray = (array) => {
  const newArray = [];

  for (let item of array) {
    if (getRandomInteger()) newArray.push(item);
  }

  return newArray;
};

export const getNullFormat = (num) => {
  let rez = num;
  if (num.toString().length < 2) {
    rez = `0${num}`
  }
  return rez;
}

export const getRandItemArray = (array) => (array[getRandomInteger(0, array?.length - 1)]);

export const capitalizeText = (word) => {
  return word.charAt(0).toUpperCase() + word.slice(1);
}

export const isItemChecked = ({ curValue, array }) => {
  if (typeof curValue === 'object') {
    const key = Object.keys(curValue)[0];
    const value = curValue[key];

    return array?.find((param) => param[key] === value) ? 'checked' : '';
  } else {
    return array?.includes(curValue) ? 'checked' : '';
  }
}

export const isChecked = ({ array, curId }) => {
  return array.includes(curId.toString()) ? 'checked' : ''
}
