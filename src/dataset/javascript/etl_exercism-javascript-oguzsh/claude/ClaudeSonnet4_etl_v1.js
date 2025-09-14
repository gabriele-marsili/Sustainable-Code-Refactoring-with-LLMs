export const transform = oldData => {
  const result = {};
  
  for (const [point, letters] of Object.entries(oldData)) {
    const numPoint = Number(point);
    for (let i = 0; i < letters.length; i++) {
      result[letters[i].toLowerCase()] = numPoint;
    }
  }
  
  return result;
};