export const parse = (phrase: string): string => {
  return phrase
    .match(/[A-Za-z]/g)
    ?.reduce((acronym, char) => acronym + char.toUpperCase(), "") || "";
};