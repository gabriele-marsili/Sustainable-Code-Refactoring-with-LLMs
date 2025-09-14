public class Queen {
    final int x, y;

    public Queen(int x, int y) throws IllegalArgumentException {
        if (x < 0 || x > 7) {
            throw new IllegalArgumentException("Queen position must have row between 0 and 7.");
        }
        if (y < 0 || y > 7) {
            throw new IllegalArgumentException("Queen position must have column between 0 and 7.");
        }
        this.x = x;
        this.y = y;
    }
}

class QueenAttackCalculator {
    final Queen queen1;
    final Queen queen2;

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
        int dx = Math.abs(queen1.x - queen2.x);
        int dy = Math.abs(queen1.y - queen2.y);
        return dx == dy;
    }

    int findTop(int a, int b) {
        return Math.max(a, b);
    }

    int findLow(int a, int b) {
        return Math.min(a, b);
    }
}