const updateArray = (array, func) => {
  for (let index = 0; index < array.length; index++) {
    const newItem = func(array[index]);
    if (!!newItem) {
      array.splice(index, 1, newItem);
      return newItem;
    }
  }
  return null;
};

module.exports = {
  updateArray,
};
