export const getNullFormat = (num) => {
  let rez = num;
  if (num.toString().length < 2) {
    rez = `0${num}`
  }
  return rez;
}


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
