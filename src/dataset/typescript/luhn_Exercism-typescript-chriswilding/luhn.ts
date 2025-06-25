const SPACE = 32
const ZERO = 48
const NINE = 57

export default class Luhn {
    public static valid(input: string): boolean {
        const numbers = []

        for (let i = 0; i < input.length; i++) {
            const c = input.charCodeAt(i);
            if (c < ZERO && c > NINE) return false
            if (c === SPACE) continue
            numbers.push(c - ZERO)
        }

        if (numbers.length < 2) return false
        numbers.reverse()

        const sum = numbers
            .reduce((sum, n, i) => {
                if (i % 2 !== 0) {
                    let doubled = n * 2
                    if (doubled > 9) {
                        doubled -= 9
                    }
                    return sum + doubled
                }
                return sum + n
            }, 0)

        return sum % 10 === 0
    }
}
