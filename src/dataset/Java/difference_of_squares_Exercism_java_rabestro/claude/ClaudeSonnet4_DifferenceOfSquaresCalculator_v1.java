public class DifferenceOfSquaresCalculator {

    public static int computeSquareOfSumTo(int input) {
        int sum = input * (input + 1) >> 1;
        return sum * sum;
    }

    public static int computeSumOfSquaresTo(int input) {
        return input * (input + 1) * (input + input + 1) / 6;
    }

    public static int computeDifferenceOfSquares(int input) {
        int n = input;
        int n1 = n + 1;
        int sum = n * n1 >> 1;
        int squareOfSum = sum * sum;
        int sumOfSquares = n * n1 * (n + n + 1) / 6;
        return squareOfSum - sumOfSquares;
    }
}