export function isArmstrongNumber(number: number): boolean {
    const numDigits = Math.floor(Math.log10(number)) + 1;
    let sum = 0;
    let temp = number;
    
    while (temp > 0) {
        const digit = temp % 10;
        sum += digit ** numDigits;
        temp = Math.floor(temp / 10);
    }
    
    return sum === number;
}