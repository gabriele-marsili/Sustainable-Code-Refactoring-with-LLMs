export function reverse(string: string): string {
  if (string.length <= 1) return string;
  
  let result = '';
  for (let i = string.length - 1; i >= 0; i--) {
    result += string[i];
  }
  return result;
}