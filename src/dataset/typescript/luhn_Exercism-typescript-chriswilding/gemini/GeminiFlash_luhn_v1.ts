const SPACE = 32;
const ZERO = 48;
const NINE = 57;

export default class Luhn {
    public static valid(input: string): boolean {
        let sum = 0;
        let alt = false;
        let nValidChars = 0;

        for (let i = input.length - 1; i >= 0; i--) {
            const charCode = input.charCodeAt(i);

            if (charCode === SPACE) {
                continue;
            }

            if (charCode < ZERO || charCode > NINE) {
                return false;
            }

            nValidChars++;
            let n = charCode - ZERO;

            if (alt) {
                n *= 2;
                if (n > 9) {
                    n -= 9;
                }
            }

            sum += n;
            alt = !alt;
        }

        return nValidChars > 1 && sum % 10 === 0;
    }
}