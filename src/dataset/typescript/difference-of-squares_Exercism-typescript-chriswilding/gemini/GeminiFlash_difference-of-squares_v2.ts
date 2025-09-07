function calculateSquareOfSum(input: number): number {
    const sum = input * (input + 1) / 2;
    return sum * sum;
}

function calculateSumOfSquares(input: number): number {
    return input * (input + 1) * (2 * input + 1) / 6;
}

class Squares {
    difference: number;
    squareOfSum: number;
    sumOfSquares: number;

    constructor(private input: number) {
        this.squareOfSum = calculateSquareOfSum(this.input);
        this.sumOfSquares = calculateSumOfSquares(this.input);
        this.difference = this.squareOfSum - this.sumOfSquares;
    }

    getDifference(): number {
        return this.difference;
    }

    getSquareOfSum(): number {
        return this.squareOfSum;
    }

    getSumOfSquares(): number {
        return this.sumOfSquares;
    }
}

export default Squares