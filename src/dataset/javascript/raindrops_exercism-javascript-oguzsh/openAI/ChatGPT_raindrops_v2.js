export const convert = (number) => {
  const divisibleBy = (factor) => number % factor === 0;
  const result =
    (divisibleBy(3) ? "Pling" : "") +
    (divisibleBy(5) ? "Plang" : "") +
    (divisibleBy(7) ? "Plong" : "");
  return result || number + "";
};
