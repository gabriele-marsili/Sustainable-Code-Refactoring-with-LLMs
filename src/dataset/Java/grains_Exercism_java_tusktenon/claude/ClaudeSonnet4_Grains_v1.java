import java.math.BigInteger;

class Grains {
  private static final BigInteger[] PRECOMPUTED_SQUARES = new BigInteger[65];
  private static final BigInteger TOTAL_GRAINS = new BigInteger("18446744073709551615");
  
  static {
    PRECOMPUTED_SQUARES[1] = BigInteger.ONE;
    for (int i = 2; i <= 64; i++) {
      PRECOMPUTED_SQUARES[i] = PRECOMPUTED_SQUARES[i - 1].shiftLeft(1);
    }
  }

  BigInteger grainsOnSquare(final int square) {
    if (square < 1 || square > 64) {
      throw new IllegalArgumentException("square must be between 1 and 64");
    }
    return PRECOMPUTED_SQUARES[square];
  }

  BigInteger grainsOnBoard() {
    return TOTAL_GRAINS;
  }
}