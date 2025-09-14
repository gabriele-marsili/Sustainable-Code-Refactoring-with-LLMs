type Rule = [string, number]

const RULES: Rule[] = [
    ['M', 1000], ['CM', 900],
    ['D', 500], ['CD', 400],
    ['C', 100], ['XC', 90],
    ['L', 50], ['XL', 40],
    ['X', 10], ['IX', 9],
    ['V', 5], ['IV', 4],
    ['I', 1]
]

export default class RomanNumerals {
    static roman(n: number): string {
        let result = ''
        let remaining = n
        
        for (const [symbol, value] of RULES) {
            while (remaining >= value) {
                result += symbol
                remaining -= value
            }
        }
        
        return result
    }
}