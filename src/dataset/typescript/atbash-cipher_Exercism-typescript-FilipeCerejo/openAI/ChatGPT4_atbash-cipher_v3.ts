const alphabet = Object.freeze({
  a: 'z', b: 'y', c: 'x', d: 'w', e: 'v', f: 'u', g: 't', h: 's', i: 'r', j: 'q',
  k: 'p', l: 'o', m: 'n', n: 'm', o: 'l', p: 'k', q: 'j', r: 'i', s: 'h', t: 'g',
  u: 'f', v: 'e', w: 'd', x: 'c', y: 'b', z: 'a', '0': '0', '1': '1', '2': '2', 
  '3': '3', '4': '4', '5': '5', '6': '6', '7': '7', '8': '8', '9': '9'
});

const chiperbet = Object.freeze({
  z: 'a', y: 'b', x: 'c', w: 'd', v: 'e', u: 'f', t: 'g', s: 'h', r: 'i', q: 'j',
  p: 'k', o: 'l', n: 'm', m: 'n', l: 'o', k: 'p', j: 'q', i: 'r', h: 's', g: 't',
  f: 'u', e: 'v', d: 'w', c: 'x', b: 'y', a: 'z', '0': '0', '1': '1', '2': '2', 
  '3': '3', '4': '4', '5': '5', '6': '6', '7': '7', '8': '8', '9': '9'
});

export function encode(plainText: string): string {
  const noWhiteSpaces = plainText.replace(/\s+/g, '');
  const transformed = Array.from(noWhiteSpaces, char => alphabet[char.toLowerCase() as keyof typeof alphabet] || '').join('');
  return transformed.match(/.{1,5}/g)?.join(' ') || '';
}

export function decode(cipherText: string): string {
  const noWhiteSpaces = cipherText.replace(/\s+/g, '');
  return Array.from(noWhiteSpaces, char => chiperbet[char.toLowerCase() as keyof typeof chiperbet] || '').join('');
}