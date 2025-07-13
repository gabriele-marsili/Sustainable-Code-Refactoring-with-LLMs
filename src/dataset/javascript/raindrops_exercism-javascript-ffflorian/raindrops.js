export function convert(input) {
  const div3 = input % 3 === 0;
  const div5 = input % 5 === 0;
  const div7 = input % 7 === 0;
  
  if (!(div3 || div5 || div7)) {
    return input.toString();
  }
  
  return (div3 ? 'Pling' : '') + 
         (div5 ? 'Plang' : '') + 
         (div7 ? 'Plong' : '');
}