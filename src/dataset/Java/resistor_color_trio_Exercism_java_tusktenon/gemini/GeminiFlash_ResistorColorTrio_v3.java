class ResistorColorTrio {
  private static final int[] COLOR_VALUES = {0, 1, 2, 3, 4, 5, 6, 7, 8, 9};
  private static final String[] COLOR_NAMES = {"black", "brown", "red", "orange", "yellow", "green", "blue", "violet", "grey", "white"};

  String label(String[] colors) {
    long r = resistance(colors);
    if (r < 1000) return r + " ohms";
    if (r < 1_000_000) return r / 1000 + " kiloohms";
    if (r < 1_000_000_000) return r / 1_000_000 + " megaohms";
    return r / 1_000_000_000 + " gigaohms";
  }

  private static long resistance(String[] colors) {
    long r = 10 * valueOf(colors[0]) + valueOf(colors[1]);
    int multiplier = valueOf(colors[2]);
    if (multiplier > 0) {
      if (multiplier < 10) {
        r *= POWERS_OF_TEN[multiplier];
      } else {
        r = 0;
      }
    }
    return r;
  }

  private static final long[] POWERS_OF_TEN = {
    1L, 10L, 100L, 1000L, 10000L, 100000L, 1000000L, 10000000L, 100000000L, 1000000000L
  };

  private static int valueOf(String color) {
    for (int i = 0; i < COLOR_NAMES.length; i++) {
      if (COLOR_NAMES[i].equals(color)) {
        return COLOR_VALUES[i];
      }
    }
    return -1; // Or throw an exception if invalid color
  }
}