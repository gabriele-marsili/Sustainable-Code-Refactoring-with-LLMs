import java.util.Map;

class RaindropConverter {
  private static final Map<Integer, String> RAINDROPS = Map.of(
      3, "Pling",
      5, "Plang",
      7, "Plong"
  );

  String convert(int number) {
    StringBuilder result = new StringBuilder();

    for (Map.Entry<Integer, String> entry : RAINDROPS.entrySet()) {
      if (number % entry.getKey() == 0) {
        result.append(entry.getValue());
      }
    }

    return result.length() > 0 ? result.toString() : Integer.toString(number);
  }
}
