type Rule = { symbol: string; value: number };

const RULES: Rule[] = [
    { symbol: 'M', value: 1000 }, { symbol: 'CM', value: 900 },
    { symbol: 'D', value: 500 }, { symbol: 'CD', value: 400 },
    { symbol: 'C', value: 100 }, { symbol: 'XC', value: 90 },
    { symbol: 'L', value: 50 }, { symbol: 'XL', value: 40 },
    { symbol: 'X', value: 10 }, { symbol: 'IX', value: 9 },
    { symbol: 'V', value: 5 }, { symbol: 'IV', value: 4 },
    { symbol: 'I', value: 1 }
];

export default class RomanNumerals {
    static roman(n: number): string {
        let result = '';
        for (const { symbol, value } of RULES) {
            while (n >= value) {
                result += symbol;
                n -= value;
            }
            if (n === 0) break;
        }
        return result;
    }
}