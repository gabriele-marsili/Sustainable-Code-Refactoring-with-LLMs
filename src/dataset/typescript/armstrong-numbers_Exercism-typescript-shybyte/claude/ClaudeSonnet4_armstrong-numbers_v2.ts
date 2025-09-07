function sum(numbers: number[]) {
    let total = 0;
    for (let i = 0; i < numbers.length; i++) {
        total += numbers[i];
    }
    return total;
}

export default class ArmstrongNumbers {
    public static isArmstrongNumber(x: number) {
        const str = x.toString();
        const length = str.length;
        let sum = 0;
        
        for (let i = 0; i < length; i++) {
            const digit = str.charCodeAt(i) - 48; // Convert char to number directly
            sum += digit ** length;
        }
        
        return x === sum;
    }
}