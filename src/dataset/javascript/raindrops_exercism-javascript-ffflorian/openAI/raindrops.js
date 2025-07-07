export function convert(input) {
  const parts = [];

  input % 3 === 0 && parts.push('Pling');
  input % 5 === 0 && parts.push('Plang');
  input % 7 === 0 && parts.push('Plong');

  return parts.length ? parts.join('') : String(input);
}
