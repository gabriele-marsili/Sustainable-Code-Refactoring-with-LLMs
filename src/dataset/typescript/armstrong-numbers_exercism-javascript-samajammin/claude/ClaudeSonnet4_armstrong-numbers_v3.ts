export default class ArmstrongNumbers {
  static isArmstrongNumber(num: number): boolean {
    if (num < 0) return false;
    
    const numStr = num.toString();
    const digitCount = numStr.length;
    let sum = 0;
    
    for (let i = 0; i < digitCount; i++) {
      const digit = +numStr[i];
      sum += digit ** digitCount;
      if (sum > num) return false;
    }
    
    return sum === num;
  }
}