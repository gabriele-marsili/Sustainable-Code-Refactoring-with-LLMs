class Darts {
  private final int score;

  Darts(double x, double y) {
    var distanceSquared = x * x + y * y;

    if (distanceSquared > 100) score = 0;
    else if (distanceSquared > 25) score = 1;
    else if (distanceSquared > 1) score = 5;
    else score = 10;
  }

  int score() {
    return score;
  }
}