export default class ArmstrongNumbers {
  static isArmstrongNumber(num: number): boolean {
    const numStr = num.toString();
    const length = numStr.length;
    let sum = 0;

    for (let i = 0; i < length; i++) {
      const digit = Number(numStr[i]);
      sum += Math.pow(digit, length);
      if (sum > num) return false; // Early exit if sum exceeds num
    }

    return sum === num;
  }
}