type EncondingType = {
    result: string;
    letter: string;
};

type DecodingType = {
    result: string;
    lastIdx: number;
};

export function encode(uncoded: string): string {
    return uncoded.split('').reduce(
        (acc: EncondingType, cur: string, idx: number, arr: string[]) => {
            if (acc.letter[0] !== cur) {
                acc.result += acc.letter ? `${acc.letter.length > 1 ? acc.letter.length : ''}${acc.letter[0]}` : '';
                acc.letter = cur;
            } else {
                acc.letter += cur;
            }
            if (idx === arr.length - 1) {
                acc.result += acc.letter ? `${acc.letter.length > 1 ? acc.letter.length : ''}${acc.letter[0]}` : '';
            }
            return acc;
        },
        { result: '', letter: '' } as EncondingType
    ).result;
}

export function decode(coded: string): string {
    return coded.split('').reduce(
        (acc: DecodingType, cur: string, idx: number) => {
            if (Number.isNaN(parseInt(cur))) {
                // console.log(acc.lastIdx, idx, Number(coded.substring(acc.lastIdx, idx)));
                acc.result += cur.repeat(Number(coded.substring(acc.lastIdx, idx))) || cur;
                acc.lastIdx = idx + 1;
            }
            return acc;
        },
        { result: '', lastIdx: 0 } as DecodingType
    ).result;
}
