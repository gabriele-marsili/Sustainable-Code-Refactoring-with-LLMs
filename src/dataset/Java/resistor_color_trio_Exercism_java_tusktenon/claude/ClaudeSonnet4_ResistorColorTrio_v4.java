class ResistorColorTrio {
  private static final java.util.Map<String, Integer> COLOR_VALUES = java.util.Map.of(
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

  private static final long[] POWERS_OF_10 = {
    1L, 10L, 100L, 1_000L, 10_000L, 100_000L, 1_000_000L, 10_000_000L, 100_000_000L, 1_000_000_000L
  };

  String label(String[] colors) {
    final long r = resistance(colors);
    if (r < 1000) return r + " ohms";
    if (r < 1_000_000) return r / 1000 + " kiloohms";
    if (r < 1_000_000_000) return r / 1_000_000 + " megaohms";
    return r / 1_000_000_000 + " gigaohms";
  }

  private static long resistance(String[] colors) {
    long base = 10L * COLOR_VALUES.get(colors[0]) + COLOR_VALUES.get(colors[1]);
    int multiplierIndex = COLOR_VALUES.get(colors[2]);
    return multiplierIndex < POWERS_OF_10.length ? base * POWERS_OF_10[multiplierIndex] : base * (long) Math.pow(10, multiplierIndex);
  }

  private static int valueOf(String color) {
    return COLOR_VALUES.get(color);
  }
}