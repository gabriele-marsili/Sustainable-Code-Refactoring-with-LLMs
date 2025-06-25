function sum(numbers: number[]) {
    return numbers.reduce((x, y) => x + y, 0)
}

export default class ArmstrongNumbers {
    public static isArmstrongNumber(x: number) {
        const digits = [...x.toString()].map((char) => parseInt(char, 10))
        return x === sum(digits.map((d) => d ** digits.length))
    }
}