const a_ascii = 'a'.charCodeAt(0);
const z_ascii = 'z'.charCodeAt(0);

function encode(clear_text) {
    let encoded = '';
    for (const char of clear_text) {
        const ascii = char.toLowerCase().charCodeAt(0);
        if (char >= 'a' && char <= 'z') {
            encoded += String.fromCharCode(z_ascii - (ascii - a_ascii));
        } else if (char >= '0' && char <= '9') {
            encoded += char;
        }
    }
    return encoded.match(/.{1,5}/g)?.join(' ') || '';
}

export const encode = encode;