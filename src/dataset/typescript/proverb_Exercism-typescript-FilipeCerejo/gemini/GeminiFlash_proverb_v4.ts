export function proverb(...words: string[]): string {
    if (!words.length) {
        return "";
    }

    const lines: string[] = new Array(words.length);
    for (let i = 0; i < words.length - 1; i++) {
        lines[i] = `For want of a ${words[i]} the ${words[i + 1]} was lost.`;
    }
    lines[words.length - 1] = `And all for the want of a ${words[0]}.`;

    return lines.join('\n');
}