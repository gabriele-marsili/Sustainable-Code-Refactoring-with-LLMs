export default function(chars) {
    if (!chars || chars.length === 0) return '';
    
    const result = [];
    for (let i = chars.length - 1; i >= 0; i--) {
        result.push(chars[i]);
    }
    return result.join('');
}