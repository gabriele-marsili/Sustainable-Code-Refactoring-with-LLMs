public class Hamming {
  private final int distance;

  public Hamming(String leftStrand, String rightStrand) {
    if (leftStrand.length() != rightStrand.length()) {
      throw new IllegalArgumentException("strands must be of equal length");
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

  public int getHammingDistance() {
    return distance;
  }
}