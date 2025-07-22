export const convert = number => 
  (number % 3 ? '' : 'Pling') +
  (number % 5 ? '' : 'Plang') +
  (number % 7 ? '' : 'Plong') || String(number);
