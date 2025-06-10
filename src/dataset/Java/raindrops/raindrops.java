import java.util.HashMap;

class RaindropConverter {
  private static final HashMap<Integer, String> raindrops = new HashMap<>();

  static {
    raindrops.put(3, "Pling");
    raindrops.put(5, "Plang");
    raindrops.put(7, "Plong");
  }

  String convert(int number) {

    return raindrops
        .keySet()
        .stream()
        .filter(key -> number % key == 0)
        .map(raindrops::get)
        .reduce(String::concat)
        .orElse(Integer.toString(number));
  }
}
