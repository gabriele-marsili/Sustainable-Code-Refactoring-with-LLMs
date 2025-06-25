function calculatSquareOfSum(input: number): number {
    const sum = input * (input + 1) / 2;
    return sum * sum;
}

function calculatSumOfSquares(input: number): number {
    return (input * (input + 1) * (2 * input + 1)) / 6;
}

class Squares {
    difference: number
    squareOfSum: number
    sumOfSquares: number

    constructor(input: number) {
        this.squareOfSum = calculatSquareOfSum(input)
        this.sumOfSquares = calculatSumOfSquares(input)
        this.difference =  this.squareOfSum - this.sumOfSquares
    }
}

export default Squares
