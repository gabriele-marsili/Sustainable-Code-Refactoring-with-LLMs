import java.math.BigInteger;

class Grains {
  private static final BigInteger[] POWERS_OF_TWO = new BigInteger[64];
  private static final BigInteger TOTAL_GRAINS = new BigInteger("18446744073709551615");
  
  static {
    POWERS_OF_TWO[0] = BigInteger.ONE;
    for (int i = 1; i < 64; i++) {
      POWERS_OF_TWO[i] = POWERS_OF_TWO[i - 1].shiftLeft(1);
    }
  }

  BigInteger grainsOnSquare(final int square) {
    if (square < 1 || square > 64) {
      throw new IllegalArgumentException("square must be between 1 and 64");
    }
    return POWERS_OF_TWO[square - 1];
  }

  BigInteger grainsOnBoard() {
    return TOTAL_GRAINS;
  }
}