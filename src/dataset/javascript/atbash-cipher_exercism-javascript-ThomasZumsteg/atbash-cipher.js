const a_ascii = 97;
const z_ascii = 122;

function encode(clear_text) {
    let result = '';
    const length = clear_text.length;
    
    for (let i = 0; i < length; i++) {
        const char = clear_text[i];
        const ascii = char.charCodeAt(0);
        
        if ((ascii >= 65 && ascii <= 90) || (ascii >= 97 && ascii <= 122)) {
            const lowerAscii = ascii >= 65 && ascii <= 90 ? ascii + 32 : ascii;
            result += String.fromCharCode(z_ascii - (lowerAscii - a_ascii));
        } else if (ascii >= 48 && ascii <= 57) {
            result += char;
        }
        
        if ((i + 1) % 5 === 0 && i < length - 1) {
            result += ' ';
        }
    }
    
    return result;
}

const shift_char = function(text, char) {
    const ascii = char.toLowerCase().charCodeAt(0);
    if (char.match(/[a-zA-Z]/))
        text += String.fromCharCode(z_ascii - (ascii - a_ascii));
    else if (char.match(/[0-9]/))
        text += char;
    return text;
};

export { encode };