public class Hamming {
  private final int distance;

  public Hamming(String leftStrand, String rightStrand) {
    if (leftStrand.length() != rightStrand.length()) {
      throw new IllegalArgumentException("strands must be of equal length");
    }
    
    int count = 0;
    int length = leftStrand.length();
    for (int i = 0; i < length; i++) {
      if (leftStrand.charAt(i) != rightStrand.charAt(i)) {
        count++;
      }
    }
    distance = count;
  }

  public int getHammingDistance() {
    return distance;
  }
}