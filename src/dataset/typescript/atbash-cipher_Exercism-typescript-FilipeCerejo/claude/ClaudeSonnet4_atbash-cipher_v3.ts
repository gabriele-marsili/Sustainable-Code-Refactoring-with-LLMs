const ALPHABET_SIZE = 26;
const CHUNK_SIZE = 5;

function createAtbashMap(): Map<string, string> {
  const map = new Map<string, string>();
  
  for (let i = 0; i < ALPHABET_SIZE; i++) {
    const char = String.fromCharCode(97 + i);
    const cipher = String.fromCharCode(122 - i);
    map.set(char, cipher);
    map.set(cipher, char);
  }
  
  for (let i = 0; i < 10; i++) {
    const digit = i.toString();
    map.set(digit, digit);
  }
  
  return map;
}

const atbashMap = createAtbashMap();

export function encode(plainText: string): string {
  const cleaned = plainText.replace(/\s+/g, '').toLowerCase();
  let encoded = '';
  
  for (let i = 0; i < cleaned.length; i++) {
    encoded += atbashMap.get(cleaned[i]) || cleaned[i];
  }
  
  return separate5(encoded);
}

function separate5(text: string): string {
  if (text.length === 0) return '';
  
  const chunks: string[] = [];
  for (let i = 0; i < text.length; i += CHUNK_SIZE) {
    chunks.push(text.slice(i, i + CHUNK_SIZE));
  }
  
  return chunks.join(' ');
}

export function decode(cipherText: string): string {
  const cleaned = cipherText.replace(/\s+/g, '').toLowerCase();
  let decoded = '';
  
  for (let i = 0; i < cleaned.length; i++) {
    decoded += atbashMap.get(cleaned[i]) || cleaned[i];
  }
  
  return decoded;
}