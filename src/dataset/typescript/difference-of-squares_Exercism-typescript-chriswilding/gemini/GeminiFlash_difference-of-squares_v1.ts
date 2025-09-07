class Squares {
    difference: number;
    squareOfSum: number;
    sumOfSquares: number;

    constructor(input: number) {
        this.squareOfSum = this.calculateSquareOfSum(input);
        this.sumOfSquares = this.calculateSumOfSquares(input);
        this.difference = this.squareOfSum - this.sumOfSquares;
    }

    private calculateSquareOfSum(input: number): number {
        const sum = input * (input + 1) / 2;
        return sum * sum;
    }

    private calculateSumOfSquares(input: number): number {
        return (input * (input + 1) * (2 * input + 1)) / 6;
    }
}

export default Squares