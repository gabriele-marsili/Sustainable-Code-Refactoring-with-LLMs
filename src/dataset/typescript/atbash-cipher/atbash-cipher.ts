const alphabet = {
  a: 'z', b: 'y', c: 'x', d: 'w', e: 'v', f: 'u', g: 't', h: 's', i: 'r', j: 'q',
   k: 'p', l: 'o', m: 'n', n: 'm', o: 'l', p: 'k', q: 'j', r: 'i', s: 'h', t: 'g',
   u: 'f', v: 'e', w: 'd', x: 'c', y: 'b', z: 'a', '0': '0', '1': '1', '2': '2', 
  '3': '3', '4': '4', '5': '5', '6': '6', '7': '7', '8': '8', '9': '9'
}

const chiperbet = {
  z: 'a', y: 'b', x: 'c', w: 'd', v: 'e', u: 'f', t: 'g', s: 'h', r: 'i', q: 'j',
  p: 'k', o: 'l', n: 'm', m: 'n', l: 'o', k: 'p', j: 'q',i: 'r', h: 's', g: 't',
  f: 'u', e: 'v', d: 'w', c: 'x', b: 'y', a: 'z', '0': '0', '1': '1', '2': '2', 
  '3': '3', '4': '4', '5': '5', '6': '6', '7': '7', '8': '8', '9': '9'
}

export function encode(plainText: string): string {
  let noWhiteSpaces = plainText.replace(/\s+/gm,'');
  let separateStr = [...noWhiteSpaces].map(l => {
    let a = l.toLowerCase() as keyof typeof alphabet;
    return alphabet[a];
  }).join('');
  return separate5(separateStr);
}

function separate5(separateStr: string) {
  let encoded = [];
  let i = 0;
  let f = 0;

  while(true) {
    if(f + 5 > separateStr.length) {
      encoded.push(separateStr.substring(i));
      break;
    }

    f = i + 5;
    encoded.push(separateStr.substring(i, f));
    
    i = f;
  }

  return encoded.join(' ').trim();
}

export function decode(cipherText: string): string {
  let noWhiteSpaces = cipherText.replace(/\s+/gm,'');
  return [...noWhiteSpaces].map(l => {
    let a = l.toLowerCase() as keyof typeof chiperbet;
    return chiperbet[a];
  }).join('');
}


