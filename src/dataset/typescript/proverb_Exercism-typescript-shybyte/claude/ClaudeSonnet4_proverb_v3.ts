export default function proverb(...nouns: string[]) {
    if (nouns.length === 0) return '';
    if (nouns.length === 1) return `And all for the want of a ${nouns[0]}.`;
    
    const lines: string[] = [];
    const lastIndex = nouns.length - 1;
    
    for (let i = 0; i < lastIndex; i++) {
        lines.push(`For want of a ${nouns[i]} the ${nouns[i + 1]} was lost.`);
    }
    
    lines.push(`And all for the want of a ${nouns[0]}.`);
    
    return lines.join('\n');
}