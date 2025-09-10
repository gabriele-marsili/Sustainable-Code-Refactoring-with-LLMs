import java.util.Map;

class ResistorColorDuo {
  private static final Map<String, Integer> COLOR_MAP = Map.of(
    "black", 0,
    "brown", 1,
    "red", 2,
    "orange", 3,
    "yellow", 4,
    "green", 5,
    "blue", 6,
    "violet", 7,
    "grey", 8,
    "white", 9
  );

  int value(String[] colors) {
    return 10 * COLOR_MAP.get(colors[0]) + COLOR_MAP.get(colors[1]);
  }
}