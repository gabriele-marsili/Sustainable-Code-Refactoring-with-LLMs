export function validate(num) {
  const str = num.toString();
  const length = str.length;
  let sum = 0;
  
  for (let i = 0; i < length; i++) {
    const digit = str.charCodeAt(i) - 48; // Convert char to digit directly
    sum += digit ** length;
  }
  
  return sum === num;
}