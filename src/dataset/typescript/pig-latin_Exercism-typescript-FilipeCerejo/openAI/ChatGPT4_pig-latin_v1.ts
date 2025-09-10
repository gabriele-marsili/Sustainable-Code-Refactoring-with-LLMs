export function translate(word: string): string {
    return word
        .split(' ')
        .map((w: string) => {
            const lowerWord = w.toLowerCase();
            if (/^[aeiou]/.test(lowerWord)) {
                return lowerWord + 'ay';
            }
            const match = lowerWord.match(/^(ch|qu|squ|th|thr|sch)|^[^aeiou]/);
            if (match) {
                const cluster = match[0];
                return lowerWord.slice(cluster.length) + cluster + 'ay';
            }
            return lowerWord;
        })
        .join(' ');
}