const a_ascii = 97; // 'a'.charCodeAt(0)
const z_ascii = 122; // 'z'.charCodeAt(0)

function encode(clear_text) {
    return clear_text
        .replace(/[a-zA-Z]/g, char => {
            const ascii = char.toLowerCase().charCodeAt(0);
            return String.fromCharCode(z_ascii - (ascii - a_ascii));
        })
        .replace(/[^a-zA-Z0-9]/g, '')
        .match(/.{1,5}/g)
        ?.join(' ') || '';
}

export const encode = encode;