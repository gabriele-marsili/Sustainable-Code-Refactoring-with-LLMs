export function translate(word: string): string {
    const words = word.split(' ');
    const result = new Array(words.length);
    
    for (let i = 0; i < words.length; i++) {
        const w = words[i].toLowerCase();
        const firstChar = w[0];
        
        if (firstChar === 'a' || firstChar === 'e' || firstChar === 'i' || firstChar === 'o' || firstChar === 'u') {
            result[i] = w + 'ay';
        } else if (w.startsWith('thr')) {
            result[i] = w.slice(3) + 'thray';
        } else if (w.startsWith('sch')) {
            result[i] = w.slice(3) + 'schay';
        } else if (w.startsWith('squ')) {
            result[i] = w.slice(3) + 'squay';
        } else if (w.startsWith('ch') || w.startsWith('qu') || w.startsWith('th')) {
            result[i] = w.slice(2) + w.slice(0, 2) + 'ay';
        } else {
            result[i] = w.slice(1) + firstChar + 'ay';
        }
    }
    
    return result.join(' ');
}