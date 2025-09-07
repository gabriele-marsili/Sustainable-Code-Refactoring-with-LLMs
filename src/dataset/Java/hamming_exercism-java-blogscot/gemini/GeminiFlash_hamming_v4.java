class Hamming {
  private final int distance;

  Hamming(String leftStrand, String rightStrand) {
    if (leftStrand.length() != rightStrand.length()) {
      throw new IllegalArgumentException("leftStrand and rightStrand must be of equal length.");
    }

    int dist = 0;
    int len = leftStrand.length();
    for (int i = 0; i < len; i++) {
      if (leftStrand.charAt(i) != rightStrand.charAt(i)) {
        dist++;
      }
    }
    this.distance = dist;
  }

  int getHammingDistance() {
    return distance;
  }
}