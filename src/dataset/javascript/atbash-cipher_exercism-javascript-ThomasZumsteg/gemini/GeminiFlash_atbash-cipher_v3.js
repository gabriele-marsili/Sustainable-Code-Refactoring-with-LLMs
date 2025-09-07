const a_ascii = 'a'.charCodeAt(0);
const z_ascii = 'z'.charCodeAt(0);

function encode(clear_text) {
  let encoded = "";
  let group = "";

  for (let i = 0; i < clear_text.length; i++) {
    const char = clear_text[i];
    const ascii = char.toLowerCase().charCodeAt(0);

    if (char.match(/[a-zA-Z]/)) {
      encoded += String.fromCharCode(z_ascii - (ascii - a_ascii));
    } else if (char.match(/[0-9]/)) {
      encoded += char;
    }

    group += encoded[encoded.length - 1];

    if (group.length === 5) {
      encoded += " ";
      group = "";
    }
  }

  if (group.length > 0) {
    encoded += " ";
  }

  return encoded.trim();
}

export const encode = encode;