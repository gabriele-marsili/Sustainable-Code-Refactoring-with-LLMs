export function encode(uncoded: string): string {
    let result = '';
    let count = 1;

    for (let i = 1; i <= uncoded.length; i++) {
        if (uncoded[i] === uncoded[i - 1]) {
            count++;
        } else {
            result += (count > 1 ? count : '') + uncoded[i - 1];
            count = 1;
        }
    }

    return result;
}

export function decode(coded: string): string {
    let result = '';
    let count = 0;

    for (const char of coded) {
        const num = parseInt(char);
        if (!isNaN(num)) {
            count = count * 10 + num;
        } else {
            result += char.repeat(count || 1);
            count = 0;
        }
    }

    return result;
}