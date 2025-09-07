class Hamming {
  private final int distance;

  Hamming(String leftStrand, String rightStrand) {
    if (leftStrand.length() != rightStrand.length()) {
      throw new IllegalArgumentException("leftStrand and rightStrand must be of equal length.");
    }

    int hammingDistance = 0;
    int length = leftStrand.length();
    for (int i = 0; i < length; i++) {
      if (leftStrand.charAt(i) != rightStrand.charAt(i)) {
        hammingDistance++;
      }
    }
    this.distance = hammingDistance;
  }

  int getHammingDistance() {
    return distance;
  }
}