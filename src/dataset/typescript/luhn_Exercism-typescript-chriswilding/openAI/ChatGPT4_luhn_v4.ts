const SPACE = 32;
const ZERO = 48;
const NINE = 57;

export default class Luhn {
    public static valid(input: string): boolean {
        let sum = 0;
        let count = 0;
        let shouldDouble = false;

        for (let i = input.length - 1; i >= 0; i--) {
            const c = input.charCodeAt(i);

            if (c === SPACE) continue;
            if (c < ZERO || c > NINE) return false;

            const n = c - ZERO;
            count++;

            if (shouldDouble) {
                const doubled = n * 2;
                sum += doubled > 9 ? doubled - 9 : doubled;
            } else {
                sum += n;
            }

            shouldDouble = !shouldDouble;
        }

        return count > 1 && sum % 10 === 0;
    }
}