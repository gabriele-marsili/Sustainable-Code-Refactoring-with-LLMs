export default class ArmstrongNumbers {
    public static isArmstrongNumber(x: number) {
        const str = x.toString()
        const numDigits = str.length
        let sum = 0
        
        for (let i = 0; i < numDigits; i++) {
            const digit = str.charCodeAt(i) - 48 // Convert char to number using ASCII
            sum += digit ** numDigits
        }
        
        return x === sum
    }
}