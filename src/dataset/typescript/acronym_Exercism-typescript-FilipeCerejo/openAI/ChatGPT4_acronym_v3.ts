export function parse(phrase: string): string {
  const endIndex = phrase.indexOf(':');
  const relevantPart = endIndex >= 0 ? phrase.slice(0, endIndex) : phrase;
  return Array.from(relevantPart.matchAll(/\b\w/g), (match) => match[0].toUpperCase()).join('');
}