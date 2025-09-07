export default class ArmstrongNumbers {
  static isArmstrongNumber(num: number): boolean {
    const numStr = num.toString();
    const numDigits = numStr.length;
    let sum = 0;
    
    for (let i = 0; i < numDigits; i++) {
      const digit = +numStr[i];
      sum += digit ** numDigits;
    }

    return sum === num;
  }
}