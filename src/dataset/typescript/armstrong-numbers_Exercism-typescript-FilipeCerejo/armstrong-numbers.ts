export function isArmstrongNumber(number: number): boolean {
    let strNumber = number.toString();
    let sum = 0;
    strNumber.split('').forEach((digit) => {
        sum += Number(digit) ** strNumber.length;
    });
    return sum === number;
}
