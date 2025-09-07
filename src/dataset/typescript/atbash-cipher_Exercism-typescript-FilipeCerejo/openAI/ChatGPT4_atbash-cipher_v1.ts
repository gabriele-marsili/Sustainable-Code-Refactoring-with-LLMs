const alphabet = {
  a: 'z', b: 'y', c: 'x', d: 'w', e: 'v', f: 'u', g: 't', h: 's', i: 'r', j: 'q',
  k: 'p', l: 'o', m: 'n', n: 'm', o: 'l', p: 'k', q: 'j', r: 'i', s: 'h', t: 'g',
  u: 'f', v: 'e', w: 'd', x: 'c', y: 'b', z: 'a', '0': '0', '1': '1', '2': '2',
  '3': '3', '4': '4', '5': '5', '6': '6', '7': '7', '8': '8', '9': '9'
};

const chiperbet = alphabet; // Reuse the same object since the mapping is symmetric

export function encode(plainText: string): string {
  const noWhiteSpaces = plainText.replace(/\s+/g, '');
  const transformed = Array.from(noWhiteSpaces, l => alphabet[l.toLowerCase() as keyof typeof alphabet] || '').join('');
  return transformed.match(/.{1,5}/g)?.join(' ') || '';
}

export function decode(cipherText: string): string {
  const noWhiteSpaces = cipherText.replace(/\s+/g, '');
  return Array.from(noWhiteSpaces, l => chiperbet[l.toLowerCase() as keyof typeof chiperbet] || '').join('');
}