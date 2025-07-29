public class Queen {
    int x, y;

    public Queen(int x, int y) throws IllegalArgumentException {

        if (x > 7) {
            throw new IllegalArgumentException("Queen position must have row <= 7.");
        } else if (y > 7) {
            throw new IllegalArgumentException("Queen position must have column <= 7.");
        } else if (x < 0) {
            throw new IllegalArgumentException("Queen position must have positive row.");
        } else if (y < 0) {
            throw new IllegalArgumentException("Queen position must have positive column.");
        }
        this.x = x;
        this.y = y;
    }
}

class QueenAttackCalculator {
    Queen queen1;
    Queen queen2;

    public QueenAttackCalculator(Queen queen1, Queen queen2) throws IllegalArgumentException {

        if (queen1 == null || queen2 == null) {
            throw new IllegalArgumentException("You must supply valid positions for both Queens.");
        }
        if (queen1.x == queen2.x && queen1.y == queen2.y) {
            throw new IllegalArgumentException("Queens cannot occupy the same position.");
        }
        this.queen1 = queen1;
        this.queen2 = queen2;
    }

    boolean canQueensAttackOneAnother() {

        return checkVertical(queen1, queen2) || checkParallel(queen1, queen2) || checkDiagonal(queen1, queen2);
    }

    boolean checkVertical(Queen queen1, Queen queen2) {
        return queen1.y == queen2.y;
    }

    boolean checkParallel(Queen queen1, Queen queen2) {
        return queen1.x == queen2.x;
    }

    boolean checkDiagonal(Queen queen1, Queen queen2) {

        for (int i = 1; i < 8 - findTop(queen1.x, queen1.y); i++) {
            if (queen1.x + i == queen2.x && queen1.y + i == queen2.y) {
                return true;
            }
        }

        for (int j = 1; j < findLow(queen1.x, queen1.y); j++) {
            if (queen1.x - j == queen2.x && queen1.y - j == queen2.y) {
                return true;
            }
        }

        for (int a = 1; a < 8 - findTop(queen1.x, queen1.y); a++) {
            if (queen1.x - a == queen2.x && queen1.y + a == queen2.y) {
                return true;
            }
        }

        for (int b = 1; b < findLow(queen1.x, queen1.y); b++) {
            if (queen1.x + b == queen2.x && queen1.y - b == queen2.y) {
                return true;
            }
        }
        return false;
    }

    int findTop(int a, int b) {
        return a >= b ? a : b;
    }

    int findLow(int a, int b) {
        return a >= b ? b : a;
    }
}
