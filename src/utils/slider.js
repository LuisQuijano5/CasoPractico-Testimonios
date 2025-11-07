export const getNextIndex = (currentIndex, length) => {
  if (length === 0) return 0;
  return (currentIndex + 1) % length;
};

export const getPrevIndex = (currentIndex, length) => {
  if (length === 0) return 0;
  return (currentIndex - 1 + length) % length;
};