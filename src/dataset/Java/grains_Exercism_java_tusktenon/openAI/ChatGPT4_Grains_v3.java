import java.math.BigInteger;

class Grains {
  private static final BigInteger TOTAL_GRAINS_ON_BOARD = BigInteger.ONE.shiftLeft(64).subtract(BigInteger.ONE);

  BigInteger grainsOnSquare(final int square) {
    if (square < 1 || square > 64) {
      throw new IllegalArgumentException("square must be between 1 and 64");
    }
    return BigInteger.ONE.shiftLeft(square - 1);
  }

  BigInteger grainsOnBoard() {
    return TOTAL_GRAINS_ON_BOARD;
  }
}