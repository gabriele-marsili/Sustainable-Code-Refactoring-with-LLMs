public class DifferenceOfSquaresCalculator {

    public static int computeSquareOfSumTo(int input) {
        int sum = input * (input + 1) >> 1;
        return sum * sum;
    }

    public static int computeSumOfSquaresTo(int input) {
        return input * (input + 1) * (input + input + 1) / 6;
    }

    public static int computeDifferenceOfSquares(int input) {
        int sum = input * (input + 1) >> 1;
        int sumSquared = sum * sum;
        int sumOfSquares = input * (input + 1) * (input + input + 1) / 6;
        return sumSquared - sumOfSquares;
    }
}