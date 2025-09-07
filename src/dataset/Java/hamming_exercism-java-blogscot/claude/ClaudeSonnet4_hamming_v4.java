class Hamming {
  private final int distance;

  Hamming(String leftStrand, String rightStrand) {
    final int leftLength = leftStrand.length();
    final int rightLength = rightStrand.length();
    
    if (leftLength != rightLength)
      throw new IllegalArgumentException("leftStrand and rightStrand must be of equal length.");

    int hammingDistance = 0;
    for (int i = 0; i < leftLength; i++) {
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