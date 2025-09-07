const a_ascii = 'a'.charCodeAt(0);
const z_ascii = 'z'.charCodeAt(0);

function encode(clear_text) {
  let encoded = "";
  for (let i = 0; i < clear_text.length; i++) {
    const char = clear_text[i];
    const lowerChar = char.toLowerCase();
    const ascii = lowerChar.charCodeAt(0);

    if (char >= 'a' && char <= 'z' || char >= 'A' && char <= 'Z') {
      encoded += String.fromCharCode(z_ascii - (ascii - a_ascii));
    } else if (char >= '0' && char <= '9') {
      encoded += char;
    }
  }

  const chunks = [];
  for (let i = 0; i < encoded.length; i += 5) {
    chunks.push(encoded.substring(i, i + 5));
  }

  return chunks.join(' ');
}

export { encode };