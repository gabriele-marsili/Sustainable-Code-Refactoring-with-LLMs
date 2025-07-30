import java.util.stream.IntStream;

public class Hamming {
  private final int distance;

  public Hamming(String leftStrand, String rightStrand) {
    if (leftStrand.length() != rightStrand.length()) {
      throw new IllegalArgumentException("strands must be of equal length");
    }
    distance =
        (int)
            IntStream.range(0, leftStrand.length())
                .filter(i -> leftStrand.codePointAt(i) != rightStrand.codePointAt(i))
                .count();
  }

  public int getHammingDistance() {
    return distance;
  }
}
