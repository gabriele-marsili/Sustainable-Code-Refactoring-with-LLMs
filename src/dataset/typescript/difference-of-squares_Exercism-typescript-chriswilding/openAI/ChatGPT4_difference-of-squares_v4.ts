function calculatSquareOfSum(input: number): number {
    const sum = (input * (input + 1)) >> 1;
    return sum * sum;
}

function calculatSumOfSquares(input: number): number {
    return (input * (input + 1) * ((input << 1) + 1)) / 6;
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