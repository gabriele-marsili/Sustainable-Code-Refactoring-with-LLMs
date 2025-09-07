import java.math.BigInteger;

class Grains {
    
    private static final BigInteger TWO_POW_64_MINUS_ONE = new BigInteger("18446744073709551615");

    BigInteger grainsOnSquare(final int square) throws IllegalArgumentException {
        
        if (square <= 0 || square > 64) throw new IllegalArgumentException("square must be between 1 and 64");
        
        return BigInteger.ONE.shiftLeft(square - 1);
    }

    BigInteger grainsOnBoard() {
        return TWO_POW_64_MINUS_ONE;
    }

}