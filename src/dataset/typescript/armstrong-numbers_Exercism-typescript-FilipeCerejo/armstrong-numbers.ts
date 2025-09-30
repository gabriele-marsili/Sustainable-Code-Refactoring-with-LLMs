export function isArmstrongNumber(number: number): boolean {
    const strNumber = number.toString();
    const numDigits = strNumber.length;
    let sum = 0;

    for (let i = 0; i < numDigits; i++) {
        const digit = parseInt(strNumber[i], 10);
        sum += Math.pow(digit, numDigits);
    }

    return sum === number;
}