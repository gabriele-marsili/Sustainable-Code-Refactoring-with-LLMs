public class Hamming {
  private final int distance;

  public Hamming(String leftStrand, String rightStrand) {
    if (leftStrand == null || rightStrand == null) {
      throw new IllegalArgumentException("strands must not be null");
    }
    if (leftStrand.length() != rightStrand.length()) {
      throw new IllegalArgumentException("strands must be of equal length");
    }
    int localDistance = 0;
    for (int i = 0, len = leftStrand.length(); i < len; i++) {
      if (leftStrand.charAt(i) != rightStrand.charAt(i)) {
        localDistance++;
      }
    }
    this.distance = localDistance;
  }

  public int getHammingDistance() {
    return distance;
  }
}