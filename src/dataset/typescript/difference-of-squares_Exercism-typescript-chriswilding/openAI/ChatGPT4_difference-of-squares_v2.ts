function calculateSquareOfSum(input: number): number {
    const sum = (input * (input + 1)) >> 1; // Use bitwise shift for division by 2
    return sum * sum;
}

function calculateSumOfSquares(input: number): number {
    return (input * (input + 1) * (2 * input + 1)) / 6;
}

class Squares {
    readonly difference: number;
    readonly squareOfSum: number;
    readonly sumOfSquares: number;

    constructor(input: number) {
        this.squareOfSum = calculateSquareOfSum(input);
        this.sumOfSquares = calculateSumOfSquares(input);
        this.difference = this.squareOfSum - this.sumOfSquares;
    }
}

export default Squares;