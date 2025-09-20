export function translate(word: string): string {
    return word
        .split(' ')
        .map((w: string) => {
            const lower = w.toLowerCase();
            const firstChar = lower[0];
            
            if (firstChar === 'a' || firstChar === 'e' || firstChar === 'i' || firstChar === 'o' || firstChar === 'u') {
                return lower + 'ay';
            }
            
            if (lower.startsWith('squ')) {
                return lower.substring(3) + 'squay';
            }
            if (lower.startsWith('thr')) {
                return lower.substring(3) + 'thray';
            }
            if (lower.startsWith('sch')) {
                return lower.substring(3) + 'schay';
            }
            if (lower.startsWith('ch') || lower.startsWith('qu') || lower.startsWith('th')) {
                return lower.substring(2) + lower.substring(0, 2) + 'ay';
            }
            
            return lower.substring(1) + firstChar + 'ay';
        })
        .join(' ');
}