class Darts {
    private double x;
    private double y;

    Darts(double x, double y) {
        this.x = x;
        this.y = y;
    }

    int score() {
        double distance = x * x + y * y;
        if (distance <= 1) {
            return 10;
        }
        else if (distance <= 25) {
            return 5;
        }
        else if (distance <= 100) {
            return 1;
        }
        else {
            return 0;
        }
    }

}
