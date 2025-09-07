export function isArmstrongNumber(number: number): boolean {
    const digits = number.toString();
    const length = digits.length;
    let sum = 0;

    for (let i = 0; i < length; i++) {
        const digit = digits.charCodeAt(i) - 48; // Faster than Number(digit)
        sum += digit ** length;
        if (sum > number) return false; // Early exit for efficiency
    }

    return sum === number;
}