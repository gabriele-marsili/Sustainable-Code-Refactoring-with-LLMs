export function translate(word: string): string {
    const vowelRegex = /^[aeiou]/;
    const clusterRegex = /^(ch|qu|squ|th|thr|sch)/;

    return word
        .split(' ')
        .map((w: string) => {
            const lowerWord = w.toLowerCase();
            if (vowelRegex.test(lowerWord)) {
                return `${lowerWord}ay`;
            }
            const clusterMatch = lowerWord.match(clusterRegex);
            if (clusterMatch) {
                return `${lowerWord.slice(clusterMatch[0].length)}${clusterMatch[0]}ay`;
            }
            return `${lowerWord.slice(1)}${lowerWord[0]}ay`;
        })
        .join(' ');
}