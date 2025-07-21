export const convert = (number) => {
  const divisibleBy = [(3, "Pling"), (5, "Plang"), (7, "Plong")];
  let result = "";

  for (let i = 0; i < 3; i++) {
    const mod = i === 0 ? 3 : i === 1 ? 5 : 7;
    if (number % mod === 0) result += divisibleBy[i][1];
  }

  return result || number.toString();
};
