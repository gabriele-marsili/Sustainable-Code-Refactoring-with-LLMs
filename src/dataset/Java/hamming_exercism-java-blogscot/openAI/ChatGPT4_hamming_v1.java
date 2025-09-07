class Hamming {
  private final int distance;

  Hamming(String leftStrand, String rightStrand) {
    if (leftStrand.length() != rightStrand.length()) {
      throw new IllegalArgumentException("leftStrand and rightStrand must be of equal length.");
    }

    this.distance = calculateHammingDistance(leftStrand, rightStrand);
  }

  private int calculateHammingDistance(String leftStrand, String rightStrand) {
    int dist = 0;
    for (int i = 0, len = leftStrand.length(); i < len; i++) {
      if (leftStrand.charAt(i) != rightStrand.charAt(i)) {
        dist++;
      }
    }
    return dist;
  }

  int getHammingDistance() {
    return distance;
  }
}