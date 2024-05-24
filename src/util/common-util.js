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

export const isChecked = ({ array, curId }) => {
  return array.includes(curId.toString()) ? 'checked' : ''
}
