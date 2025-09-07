const a_ascii = 'a'.charCodeAt(0);
const z_ascii = 'z'.charCodeAt(0);
const regexAlpha = /[a-zA-Z]/;
const regexNum = /[0-9]/;

function encode(clear_text) {
  let encoded = "";
  let group = "";

  for (let i = 0; i < clear_text.length; i++) {
    const char = clear_text[i];
    let encodedChar;

    if (regexAlpha.test(char)) {
      const ascii = char.toLowerCase().charCodeAt(0);
      encodedChar = String.fromCharCode(z_ascii - (ascii - a_ascii));
    } else if (regexNum.test(char)) {
      encodedChar = char;
    } else {
      encodedChar = char; 
    }

    group += encodedChar;

    if (group.length === 5) {
      encoded += group + " ";
      group = "";
    }
  }

  if (group.length > 0) {
    encoded += group;
  }

  return encoded.trim();
}

export const encode = encode;