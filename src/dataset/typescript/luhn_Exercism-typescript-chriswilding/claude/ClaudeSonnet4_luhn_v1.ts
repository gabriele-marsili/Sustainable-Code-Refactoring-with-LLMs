const SPACE = 32
const ZERO = 48
const NINE = 57

export default class Luhn {
    public static valid(input: string): boolean {
        let sum = 0
        let digitCount = 0
        let isEven = true

        for (let i = input.length - 1; i >= 0; i--) {
            const c = input.charCodeAt(i)
            
            if (c === SPACE) continue
            if (c < ZERO || c > NINE) return false
            
            let digit = c - ZERO
            
            if (!isEven) {
                digit <<= 1
                if (digit > 9) digit -= 9
            }
            
            sum += digit
            digitCount++
            isEven = !isEven
        }

        return digitCount >= 2 && sum % 10 === 0
    }
}