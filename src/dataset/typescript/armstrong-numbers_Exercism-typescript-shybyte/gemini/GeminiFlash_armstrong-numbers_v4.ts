function sum(numbers: number[]) {
    let total = 0;
    for (let i = 0; i < numbers.length; i++) {
        total += numbers[i];
    }
    return total;
}

export default class ArmstrongNumbers {
    public static isArmstrongNumber(x: number) {
        const numStr = x.toString();
        const numDigits = numStr.length;
        let armstrongSum = 0;

        for (let i = 0; i < numDigits; i++) {
            const digit = parseInt(numStr[i], 10);
            armstrongSum += digit ** numDigits;
        }

        return x === armstrongSum;
    }
}