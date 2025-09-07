function calculatSquareOfSum(input: number): number {
    const sum = input * (input + 1) * 0.5;
    return sum * sum;
}

function calculatSumOfSquares(input: number): number {
    return (input * (input + 1) * (input + input + 1)) / 6;
}

class Squares {
    readonly difference: number;
    readonly squareOfSum: number;
    readonly sumOfSquares: number;

    constructor(input: number) {
        const inputPlusOne = input + 1;
        const sum = input * inputPlusOne * 0.5;
        this.squareOfSum = sum * sum;
        this.sumOfSquares = (input * inputPlusOne * (input + input + 1)) / 6;
        this.difference = this.squareOfSum - this.sumOfSquares;
    }
}

export default Squares;