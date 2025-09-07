export function rotate(sentence: string, shift: number): string {
    const normalizedShift = ((shift % 26) + 26) % 26;
    if (normalizedShift === 0) return sentence;
    
    let result = '';
    for (let i = 0; i < sentence.length; i++) {
        const char = sentence[i];
        const code = char.charCodeAt(0);
        
        if (code >= 65 && code <= 90) {
            result += String.fromCharCode(((code - 65 + normalizedShift) % 26) + 65);
        } else if (code >= 97 && code <= 122) {
            result += String.fromCharCode(((code - 97 + normalizedShift) % 26) + 97);
        } else {
            result += char;
        }
    }
    return result;
}