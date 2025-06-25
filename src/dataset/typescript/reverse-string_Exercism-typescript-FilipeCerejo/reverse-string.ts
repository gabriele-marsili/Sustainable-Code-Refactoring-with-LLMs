export function reverse(chars: string) {
  let reversed = '';
  for(let w = chars.length - 1; w >= 0; w--) {
    reversed += chars[w];
  }
  return reversed;
}
