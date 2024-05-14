
const quickSort = (array, field) => {
  if (array.length <= 1) {
    return array;
  }

  const pivot = array[Math.floor(array.length / 2)];
  const left = array.filter((item) => item[field].localeCompare(pivot[field]) < 0);
  const middle = array.filter((item) => item[field].localeCompare(pivot[field]) === 0);
  const right = array.filter((item) => item[field].localeCompare(pivot[field]) > 0);

  return [...quickSort(left, field), ...middle, ...quickSort(right, field)];
};

const SortData = (array, field) => {
  console.log("Antes de ordenar:", array);
  const sortedArray = quickSort(array, field);
  console.log("Después de ordenar:", sortedArray);
  return sortedArray;
};

export default SortData;