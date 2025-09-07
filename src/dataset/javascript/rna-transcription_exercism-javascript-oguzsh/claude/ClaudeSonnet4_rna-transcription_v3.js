export const toRna = (data = "") => {
  const dnaRnaComplement = {
    G: "C",
    C: "G",
    T: "A",
    A: "U"
  };

  let result = "";
  for (let i = 0; i < data.length; i++) {
    result += dnaRnaComplement[data[i]];
  }
  return result;
};