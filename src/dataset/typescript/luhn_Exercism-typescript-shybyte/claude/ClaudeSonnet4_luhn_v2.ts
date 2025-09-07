export default class Luhn {
    static valid(input: string) {
        if (!input.match(/^\d[\d ]+$/)) {
            return false
        }

        let sum = 0
        let isEvenPosition = false
        
        for (let i = input.length - 1; i >= 0; i--) {
            const char = input[i]
            if (char === ' ') continue
            
            let digit = parseInt(char, 10)
            
            if (isEvenPosition) {
                digit *= 2
                if (digit > 9) {
                    digit -= 9
                }
            }
            
            sum += digit
            isEvenPosition = !isEvenPosition
        }
        
        return sum % 10 === 0
    }
}