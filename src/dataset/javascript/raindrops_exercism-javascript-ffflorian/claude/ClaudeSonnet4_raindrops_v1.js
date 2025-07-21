export function convert(input) {
 const div3 = input % 3 === 0;
 const div5 = input % 5 === 0;
 const div7 = input % 7 === 0;
 
 if (!(div3 || div5 || div7)) {
   return input.toString();
 }
 
 let result = '';
 if (div3) result += 'Pling';
 if (div5) result += 'Plang';
 if (div7) result += 'Plong';
 
 return result;
}