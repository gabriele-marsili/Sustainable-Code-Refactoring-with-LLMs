export function isArmstrongNumber(number: number): boolean {
    if (number < 0) return false;
    if (number < 10) return true;
    
    let temp = number;
    let digitCount = 0;
    
    while (temp > 0) {
        digitCount++;
        temp = Math.floor(temp / 10);
    }
    
    temp = number;
    let sum = 0;
    
    while (temp > 0) {
        const digit = temp % 10;
        sum += digit ** digitCount;
        temp = Math.floor(temp / 10);
    }
    
    return sum === number;
}