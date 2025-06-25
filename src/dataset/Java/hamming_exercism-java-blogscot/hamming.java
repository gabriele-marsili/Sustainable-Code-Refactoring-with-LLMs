class Hamming {
  private int distance;

  Hamming(String leftStrand, String rightStrand) {
    if (leftStrand.length() != rightStrand.length())
      throw new IllegalArgumentException("leftStrand and rightStrand must be of equal length.");

    for (int i = 0; i < leftStrand.length(); i++) {
      if (leftStrand.charAt(i) != rightStrand.charAt(i)) distance++;
    }
  }

  int getHammingDistance() {
    return distance;
  }

}
