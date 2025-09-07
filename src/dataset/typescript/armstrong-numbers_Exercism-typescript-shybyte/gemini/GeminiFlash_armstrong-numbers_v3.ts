export default class ArmstrongNumbers {
    public static isArmstrongNumber(x: number) {
        const numStr = x.toString();
        const numDigits = numStr.length;
        let sum = 0;
        for (let i = 0; i < numDigits; i++) {
            const digit = parseInt(numStr[i], 10);
            sum += digit ** numDigits;
        }
        return x === sum;
    }
}