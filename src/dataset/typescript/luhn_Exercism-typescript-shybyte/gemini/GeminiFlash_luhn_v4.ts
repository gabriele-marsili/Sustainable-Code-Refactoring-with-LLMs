export default class Luhn {
    static valid(input: string) {
        let sum = 0;
        let alt = false;
        let n = input.length;
        let numDigits = 0;

        for (let i = n - 1; i >= 0; i--) {
            const char = input[i];

            if (char === ' ') {
                continue;
            }

            if (!/^\d$/.test(char)) {
                return false;
            }

            numDigits++;
            let digit = parseInt(char, 10);

            if (alt) {
                digit *= 2;
                if (digit > 9) {
                    digit -= 9;
                }
            }

            sum += digit;
            alt = !alt;
        }

        return numDigits > 1 && sum % 10 === 0;
    }
}