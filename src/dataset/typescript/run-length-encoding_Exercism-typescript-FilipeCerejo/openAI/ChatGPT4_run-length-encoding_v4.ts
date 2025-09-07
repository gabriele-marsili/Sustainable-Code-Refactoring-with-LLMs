type EncodingType = {
    result: string[];
    count: number;
    prevChar: string;
};

type DecodingType = {
    result: string[];
    countBuffer: string;
};

export function encode(uncoded: string): string {
    const { result } = uncoded.split('').reduce(
        (acc: EncodingType, cur: string) => {
            if (cur === acc.prevChar) {
                acc.count++;
            } else {
                if (acc.prevChar) {
                    acc.result.push(acc.count > 1 ? `${acc.count}${acc.prevChar}` : acc.prevChar);
                }
                acc.prevChar = cur;
                acc.count = 1;
            }
            return acc;
        },
        { result: [], count: 0, prevChar: '' } as EncodingType
    );
    if (result.length === 0 || uncoded[uncoded.length - 1] === result[result.length - 1]) {
        result.push(result.length > 1 ? `${result.length}${uncoded}` : uncoded);
    }
    return result.join('');
}

export function decode(coded: string): string {
    const { result } = coded.split('').reduce(
        (acc: DecodingType, cur: string) => {
            if (!isNaN(Number(cur))) {
                acc.countBuffer += cur;
            } else {
                const count = acc.countBuffer ? parseInt(acc.countBuffer) : 1;
                acc.result.push(cur.repeat(count));
                acc.countBuffer = '';
            }
            return acc;
        },
        { result: [], countBuffer: '' } as DecodingType
    );
    return result.join('');
}