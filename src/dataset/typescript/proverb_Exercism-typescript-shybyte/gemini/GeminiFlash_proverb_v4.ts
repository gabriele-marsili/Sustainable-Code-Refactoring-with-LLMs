export default function proverb(...nouns: string[]) {
    const len = nouns.length;
    if (len === 0) {
        return "";
    }

    const lines: string[] = new Array(len);
    for (let i = 0; i < len - 1; i++) {
        lines[i] = `For want of a ${nouns[i]} the ${nouns[i + 1]} was lost.`;
    }

    lines[len - 1] = `And all for the want of a ${nouns[0]}.`;
    return lines.join('\n');
}