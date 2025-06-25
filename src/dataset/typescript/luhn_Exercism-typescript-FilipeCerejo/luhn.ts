export function valid(digitString: string): boolean {
  let noSpaceDigit = digitString.replace(/\s/g, '');
  if(noSpaceDigit.length < 2) return false;

  let sum = 0;
  let change = false;
  for(let d = noSpaceDigit.length - 1; d >= 0; d--) {
    let digit = Number(noSpaceDigit[d]);
    if(change) {
      sum += digit * 2 > 9 ? digit * 2 - 9 : digit * 2;
    } else {
      sum += digit;
    }

    change = !change;
  }

  return sum % 10 === 0;
}
