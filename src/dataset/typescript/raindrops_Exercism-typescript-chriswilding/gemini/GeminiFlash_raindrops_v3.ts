export default class Rainsdrops {
  convert(n: number): string {
    let result = "";
    const isDivisibleBy3 = n % 3 === 0;
    const isDivisibleBy5 = n % 5 === 0;
    const isDivisibleBy7 = n % 7 === 0;

    if (isDivisibleBy3) {
      result += "Pling";
    }
    if (isDivisibleBy5) {
      result += "Plang";
    }
    if (isDivisibleBy7) {
      result += "Plong";
    }

    return result || n.toString();
  }
}