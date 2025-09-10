export function translate(word: string): string {
    return word
        .split(' ')
        .map((w: string) => {
            const lowerW = w.toLowerCase();
            if (/^[aeiou]/.test(lowerW)) {
                return lowerW + 'ay';
            }

            const consonantClusterMatch = lowerW.match(/^(ch|qu|squ|th|thr|sch)/);
            if (consonantClusterMatch) {
                const cluster = consonantClusterMatch[0];
                return lowerW.substring(cluster.length) + cluster + 'ay';
            }

            if (/^[^aeiou]/.test(lowerW)) {
                return lowerW.substring(1) + lowerW[0] + 'ay';
            }

            return lowerW;
        })
        .join(' ');
}