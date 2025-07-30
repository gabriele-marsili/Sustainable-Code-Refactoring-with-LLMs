public class DifferenceOfSquaresCalculator {

    public static int computeSquareOfSumTo(int input) {
        int sum = input * (input + 1) / 2;
        return sum * sum;
    }

    public static int computeSumOfSquaresTo(int input) {
        return input * (input + 1) * (2 * input + 1) / 6;
    }

    public static int computeDifferenceOfSquares(int input) {
        return computeSquareOfSumTo(input) - computeSumOfSquaresTo(input);
    }
}
