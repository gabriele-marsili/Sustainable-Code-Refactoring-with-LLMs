type EncondingType = {
    result: string;
    letter: string;
};

type DecodingType = {
    result: string;
    lastIdx: number;
};

export function encode(uncoded: string): string {
    if (!uncoded) return "";

    let result = "";
    let currentChar = "";
    let charCount = 0;

    for (let i = 0; i < uncoded.length; i++) {
        const char = uncoded[i];
        if (char !== currentChar) {
            if (currentChar) {
                result += charCount > 1 ? charCount.toString() + currentChar : currentChar;
            }
            currentChar = char;
            charCount = 1;
        } else {
            charCount++;
        }
    }

    result += charCount > 1 ? charCount.toString() + currentChar : currentChar;
    return result;
}

export function decode(coded: string): string {
    if (!coded) return "";

    let result = "";
    let i = 0;

    while (i < coded.length) {
        let j = i;
        while (j < coded.length && !isNaN(Number(coded[j]))) {
            j++;
        }

        const countStr = coded.substring(i, j);
        const count = countStr ? parseInt(countStr, 10) : 1;
        const char = coded[j];

        result += char.repeat(count);
        i = j + 1;
    }

    return result;
}