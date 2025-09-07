import java.math.BigInteger;

class Grains {

    private static final BigInteger TWO = BigInteger.valueOf(2);

    BigInteger grainsOnSquare(final int square) throws IllegalArgumentException {
        if (square <= 0 || square > 64) throw new IllegalArgumentException("square must be between 1 and 64");
        return TWO.pow(square - 1);
    }

    BigInteger grainsOnBoard() {
        return TWO.pow(64).subtract(BigInteger.ONE);
    }

}