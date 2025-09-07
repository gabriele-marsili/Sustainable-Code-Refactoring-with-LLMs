export class Squares {
  constructor(private number: number) {}

  get sumOfSquares(): number {
    let sum = 0;
    for (let i = 1; i <= this.number; i++) {
      sum += i * i;
    }
    return sum;
  }

  get squareOfSum(): number {
    const sum = (this.number * (this.number + 1)) / 2;
    return sum * sum;
  }

  get difference(): number {
    return this.squareOfSum - this.sumOfSquares; 
  }

  private squareOf(number: number): number {
    return number * number;
  }

  private getNumbers(): number[] {
    const result = new Array(this.number);
    for (let i = 0; i < this.number; i++) {
      result[i] = i + 1;
    }
    return result;
  }
}