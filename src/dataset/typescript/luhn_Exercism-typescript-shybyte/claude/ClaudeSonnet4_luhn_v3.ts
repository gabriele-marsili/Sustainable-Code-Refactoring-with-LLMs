const toReversedDigits = (n: string) => {
    const result: number[] = []
    for (let i = n.length - 1; i >= 0; i--) {
        const char = n[i]
        if (char !== ' ') {
            result.push(char.charCodeAt(0) - 48)
        }
    }
    return result
}

const handleEverySecondDigit = (digit: number) => {
    const doubled = digit * 2
    return doubled > 9 ? doubled - 9 : doubled
}

export default class Luhn {
    static valid(input: string) {
        if (input.length < 2 || !/^\d[\d ]+$/.test(input)) {
            return false
        }

        const reversedDigits = toReversedDigits(input)
        let checksum = 0
        
        for (let i = 0; i < reversedDigits.length; i++) {
            checksum += i % 2 === 1 ? handleEverySecondDigit(reversedDigits[i]) : reversedDigits[i]
        }
        
        return checksum % 10 === 0
    }
}