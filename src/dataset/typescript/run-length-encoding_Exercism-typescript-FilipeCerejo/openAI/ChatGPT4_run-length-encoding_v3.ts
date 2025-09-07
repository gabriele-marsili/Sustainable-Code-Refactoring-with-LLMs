type EncodingType = {
    result: string;
    count: number;
    prevChar: string;
};

type DecodingType = {
    result: string;
    countBuffer: string;
};

export function encode(uncoded: string): string {
    let { result, count, prevChar } = uncoded.split('').reduce(
        (acc: EncodingType, cur: string) => {
            if (cur === acc.prevChar) {
                acc.count++;
            } else {
                if (acc.prevChar) {
                    acc.result += (acc.count > 1 ? acc.count : '') + acc.prevChar;
                }
                acc.prevChar = cur;
                acc.count = 1;
            }
            return acc;
        },
        { result: '', count: 0, prevChar: '' } as EncodingType
    );

    if (prevChar) {
        result += (count > 1 ? count : '') + prevChar;
    }

    return result;
}

export function decode(coded: string): string {
    return coded.split('').reduce(
        (acc: DecodingType, cur: string) => {
            if (!isNaN(Number(cur))) {
                acc.countBuffer += cur;
            } else {
                const count = acc.countBuffer ? parseInt(acc.countBuffer) : 1;
                acc.result += cur.repeat(count);
                acc.countBuffer = '';
            }
            return acc;
        },
        { result: '', countBuffer: '' } as DecodingType
    ).result;
}