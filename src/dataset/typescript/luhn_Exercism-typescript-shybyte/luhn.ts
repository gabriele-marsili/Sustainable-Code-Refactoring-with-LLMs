const toReversedDigits = (n: string) => [...n]
    .filter((char) => char !== ' ')
    .reverse()
    .map((s) => parseInt(s, 10))

const handleEverySecondDigit = (digit: number) => {
    const doubled = digit * 2
    return (doubled < 10) ? doubled : (doubled - 9)
}

export default class Luhn {
    static valid(input: string) {
        if (!input.match(/^\d[\d ]+$/)) {
            return false
        }

        const reversedDigits = toReversedDigits(input)
        const addends = reversedDigits.map(
            (d, i) => i % 2 === 1 ? handleEverySecondDigit(d) : d
        ).reverse()
        const checksum = addends.reduce((sum, d) => sum + d, 0)
        return checksum % 10 === 0
    }
}
