export const convert = number => {
  const result = 
    (number % 3 === 0 ? "Pling" : "") +
    (number % 5 === 0 ? "Plang" : "") +
    (number % 7 === 0 ? "Plong" : "");
  return result || String(number);
};
