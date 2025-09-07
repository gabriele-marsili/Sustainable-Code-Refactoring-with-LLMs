export default function(chars) {
    if (!chars || chars.length === 0) return '';
    if (chars.length === 1) return chars;
    
    const result = [];
    for (let i = chars.length - 1; i >= 0; i--) {
        result.push(chars[i]);
    }
    return result.join('');
}