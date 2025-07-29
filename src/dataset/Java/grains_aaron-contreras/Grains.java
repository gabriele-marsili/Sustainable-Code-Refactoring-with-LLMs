import java.math.BigInteger;

class Grains {

    BigInteger grainsOnSquare(final int square) throws IllegalArgumentException {
        
        if (square <= 0 || square > 64) throw new IllegalArgumentException("square must be between 1 and 64");
        
        BigInteger result = BigInteger.ONE;
        
        for (int multiplier = 1; multiplier < square; multiplier++) {
            result = result.multiply(BigInteger.TWO);
        }
        return result;
    }

    BigInteger grainsOnBoard() {
        BigInteger result = BigInteger.ZERO;
        for (int i = 1; i <= 64; i++) {
            result = result.add(grainsOnSquare(i));
        }
        return result;
    }

}
