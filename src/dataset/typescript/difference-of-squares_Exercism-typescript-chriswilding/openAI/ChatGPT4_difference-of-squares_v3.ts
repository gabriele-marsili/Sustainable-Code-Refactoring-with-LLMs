function calculatSquareOfSum(input: number): number {
    const n = input;
    const sum = (n * (n + 1)) >> 1; // Use bitwise shift for division by 2
    return sum * sum;
}

function calculatSumOfSquares(input: number): number {
    const n = input;
    return (n * (n + 1) * ((n << 1) + 1)) / 6; // Use bitwise shift for multiplication by 2
}

class Squares {
    difference: number;
    squareOfSum: number;
    sumOfSquares: number;

    constructor(input: number) {
        const squareOfSum = calculatSquareOfSum(input);
        const sumOfSquares = calculatSumOfSquares(input);
        this.squareOfSum = squareOfSum;
        this.sumOfSquares = sumOfSquares;
        this.difference = squareOfSum - sumOfSquares;
    }
}

export default Squares;