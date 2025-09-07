const SPACE = 32;
const ZERO = 48;
const NINE = 57;

export default class Luhn {
    public static valid(input: string): boolean {
        let sum = 0;
        let alt = false;
        let nLength = 0;

        for (let i = input.length - 1; i >= 0; i--) {
            const c = input.charCodeAt(i);

            if (c === SPACE) continue;

            if (c < ZERO || c > NINE) return false;

            const n = c - ZERO;
            nLength++;

            if (alt) {
                let doubled = n * 2;
                if (doubled > 9) {
                    doubled -= 9;
                }
                sum += doubled;
            } else {
                sum += n;
            }
            alt = !alt;
        }

        return nLength > 1 && sum % 10 === 0;
    }
}