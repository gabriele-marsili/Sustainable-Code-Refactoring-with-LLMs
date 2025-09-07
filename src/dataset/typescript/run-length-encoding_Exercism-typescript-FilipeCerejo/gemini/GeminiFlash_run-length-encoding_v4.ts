type EncondingType = {
    result: string;
    letter: string;
};

type DecodingType = {
    result: string;
    lastIdx: number;
};

export function encode(uncoded: string): string {
    if (!uncoded) {
        return "";
    }

    let result = "";
    let letter = "";
    let count = 0;

    for (let i = 0; i < uncoded.length; i++) {
        const char = uncoded[i];
        if (char === letter) {
            count++;
        } else {
            if (letter) {
                result += (count > 1 ? count : "") + letter;
            }
            letter = char;
            count = 1;
        }
    }

    result += (count > 1 ? count : "") + letter;
    return result;
}

export function decode(coded: string): string {
    if (!coded) {
        return "";
    }

    let result = "";
    let i = 0;

    while (i < coded.length) {
        let j = i;
        while (j < coded.length && !isNaN(Number(coded[j]))) {
            j++;
        }

        const repeatCount = j > i ? Number(coded.substring(i, j)) : 1;
        const char = coded[j];

        result += char.repeat(repeatCount);
        i = j + 1;
    }

    return result;
}