const a_ascii = 'a'.charCodeAt(0);
const z_ascii = 'z'.charCodeAt(0);

function encode(clear_text) {
    let result = '';
    let chunk = '';
    for (const char of clear_text) {
        const ascii = char.toLowerCase().charCodeAt(0);
        if (char >= 'a' && char <= 'z') {
            chunk += String.fromCharCode(z_ascii - (ascii - a_ascii));
        } else if (char >= '0' && char <= '9') {
            chunk += char;
        }
        if (chunk.length === 5) {
            result += chunk + ' ';
            chunk = '';
        }
    }
    if (chunk) result += chunk;
    return result.trim();
}

export const encode = encode;