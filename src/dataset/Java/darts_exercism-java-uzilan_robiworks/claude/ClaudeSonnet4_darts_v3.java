class Darts {
    private final double distanceSquared;

    Darts(double x, double y) {
        this.distanceSquared = x * x + y * y;
    }

    int score() {
        if (distanceSquared <= 1) {
            return 10;
        }
        if (distanceSquared <= 25) {
            return 5;
        }
        if (distanceSquared <= 100) {
            return 1;
        }
        return 0;
    }
}