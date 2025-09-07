const toReversedDigits = (n: string) => {
    const digits: number[] = [];
    for (let i = n.length - 1; i >= 0; i--) {
        const char = n[i];
        if (char !== ' ') {
            digits.push(parseInt(char, 10));
        }
    }
    return digits;
};

const handleEverySecondDigit = (digit: number) => {
    const doubled = digit * 2;
    return doubled - (doubled > 9 ? 9 : 0);
};

export default class Luhn {
    static valid(input: string) {
        if (!/^\d[\d ]+$/.test(input)) {
            return false;
        }

        let checksum = 0;
        let isSecond = false;

        for (let i = input.length - 1; i >= 0; i--) {
            const char = input[i];
            if (char === ' ') continue;

            const digit = parseInt(char, 10);
            checksum += isSecond ? handleEverySecondDigit(digit) : digit;
            isSecond = !isSecond;
        }

        return checksum % 10 === 0;
    }
}