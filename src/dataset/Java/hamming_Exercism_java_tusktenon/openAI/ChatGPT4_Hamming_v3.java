public class Hamming {
  private final int distance;

  public Hamming(String leftStrand, String rightStrand) {
    if (leftStrand.length() != rightStrand.length()) {
      throw new IllegalArgumentException("strands must be of equal length");
    }
    int tempDistance = 0;
    for (int i = 0; i < leftStrand.length(); i++) {
      if (leftStrand.charAt(i) != rightStrand.charAt(i)) {
        tempDistance++;
      }
    }
    this.distance = tempDistance;
  }

  public int getHammingDistance() {
    return distance;
  }
}