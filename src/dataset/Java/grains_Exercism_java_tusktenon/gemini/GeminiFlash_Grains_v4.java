import java.math.BigInteger;

class Grains {
  BigInteger grainsOnSquare(final int square) {
    if (square < 1 || square > 64) {
      throw new IllegalArgumentException("square must be between 1 and 64");
    }
    return BigInteger.ONE.shiftLeft(square - 1);
  }

  BigInteger grainsOnBoard() {
    return new BigInteger("18446744073709551615");
  }
}