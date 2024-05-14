export const SortDate = (array, field, order = 'desc') => {
  const sortOrder = order.toLowerCase() === 'asc' ? 1 : -1;

  // Hacer una copia del array original antes de ordenar
  const copiedArray = [...array];

  const sortedArray = copiedArray.sort((a, b) => {
    const dateA = new Date(a[field]);
    const dateB = new Date(b[field]);

    // Multiplicamos por sortOrder para cambiar la dirección del ordenamiento
    return (dateA - dateB) * sortOrder;
  });

  return sortedArray;
};
