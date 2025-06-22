export function proverb(...words: string[]): string {
    return words
        .reduce((acc: string[], cur: string, idx: number, arr: string[]) => {
            if (idx < arr.length - 1) {
                acc.push(`For want of a ${cur} the ${arr[idx + 1]} was lost.`);
            } else {
                acc.push(`And all for the want of a ${arr[0]}.`);
            }
            return acc;
        }, [])
        .join('\n');
}
