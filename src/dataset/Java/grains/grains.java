import java.math.BigInteger;

class Grains {

    BigInteger grainsOnSquare(final int square) {
        if (!((square > 0) && (square < 65))) {
            throw new IllegalArgumentException("square must be between 1 and 64");
        }
        BigInteger grains = new BigInteger("1");
        BigInteger multiplier = new BigInteger("2");
        for (int i = 1; i < square; i++) {
            grains = grains.multiply(multiplier);
        }
        return grains;
    }

    BigInteger grainsOnBoard() {
        BigInteger totalGrains = new BigInteger("0");
        for (int i = 1; i < 65; i++) {
            totalGrains = totalGrains.add(grainsOnSquare(i));
        }
        return totalGrains;
    }

}
