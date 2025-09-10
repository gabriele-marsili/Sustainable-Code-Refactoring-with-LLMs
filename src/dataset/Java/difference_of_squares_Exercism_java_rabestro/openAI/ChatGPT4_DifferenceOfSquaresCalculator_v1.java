public class DifferenceOfSquaresCalculator {

    public static int computeSquareOfSumTo(int input) {
        long sum = (long) input * (input + 1) / 2;
        return (int) (sum * sum);
    }

    public static int computeSumOfSquaresTo(int input) {
        return (int) ((long) input * (input + 1) * (2L * input + 1) / 6);
    }

    public static int computeDifferenceOfSquares(int input) {
        long sum = (long) input * (input + 1) / 2;
        long squareOfSum = sum * sum;
        long sumOfSquares = (long) input * (input + 1) * (2L * input + 1) / 6;
        return (int) (squareOfSum - sumOfSquares);
    }
}