class Darts {
  private final int score;

  Darts(double x, double y) {
    var distance = Math.sqrt(x * x + y * y);

    if (distance > 10) score = 0;
    else if (distance > 5) score = 1;
    else if (distance > 1) score = 5;
    else score = 10;
  }

  int score() {
    return score;
  }
}
