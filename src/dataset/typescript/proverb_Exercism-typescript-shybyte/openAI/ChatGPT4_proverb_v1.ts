export default function proverb(...nouns: string[]) {
    const len = nouns.length;
    if (len < 2) return `And all for the want of a ${nouns[0] || ''}.`;

    let result = '';
    for (let i = 0; i < len - 1; i++) {
        result += `For want of a ${nouns[i]} the ${nouns[i + 1]} was lost.\n`;
    }
    return result + `And all for the want of a ${nouns[0]}.`;
}