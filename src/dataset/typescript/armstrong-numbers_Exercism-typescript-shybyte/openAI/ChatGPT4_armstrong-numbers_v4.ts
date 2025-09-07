function sum(numbers: number[]): number {
    let total = 0;
    for (const num of numbers) {
        total += num;
    }
    return total;
}

export default class ArmstrongNumbers {
    public static isArmstrongNumber(x: number): boolean {
        const str = x.toString();
        const len = str.length;
        let sum = 0;
        for (let i = 0; i < len; i++) {
            const digit = str.charCodeAt(i) - 48; // Faster than parseInt
            sum += digit ** len;
            if (sum > x) return false; // Early exit for efficiency
        }
        return sum === x;
    }
}