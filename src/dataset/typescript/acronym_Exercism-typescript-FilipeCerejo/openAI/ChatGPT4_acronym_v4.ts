export function parse(phrase: string): string {
  const endIndex = phrase.indexOf(':');
  const relevantPart = endIndex >= 0 ? phrase.slice(0, endIndex) : phrase;
  return relevantPart.replace(/[^a-zA-Z]+/g, ' ')
    .split(' ')
    .filter(Boolean)
    .map(word => word[0].toUpperCase())
    .join('');
}