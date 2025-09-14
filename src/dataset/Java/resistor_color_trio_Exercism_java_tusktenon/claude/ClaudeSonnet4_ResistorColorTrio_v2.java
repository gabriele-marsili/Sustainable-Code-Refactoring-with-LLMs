class ResistorColorTrio {
  private static final String[] COLOR_NAMES = {
    "black", "brown", "red", "orange", "yellow", 
    "green", "blue", "violet", "grey", "white"
  };
  
  private static final long[] POWERS_OF_10 = {
    1L, 10L, 100L, 1_000L, 10_000L, 100_000L, 1_000_000L, 
    10_000_000L, 100_000_000L, 1_000_000_000L
  };

  String label(String[] colors) {
    final long r = resistance(colors);
    if (r < 1000) return r + " ohms";
    if (r < 1_000_000) return r / 1000 + " kiloohms";
    if (r < 1_000_000_000) return r / 1_000_000 + " megaohms";
    return r / 1_000_000_000 + " gigaohms";
  }

  private static long resistance(String[] colors) {
    long r = 10 * valueOf(colors[0]) + valueOf(colors[1]);
    int multiplier = valueOf(colors[2]);
    return r * POWERS_OF_10[multiplier];
  }

  private static int valueOf(String color) {
    for (int i = 0; i < COLOR_NAMES.length; i++) {
      if (COLOR_NAMES[i].equals(color)) {
        return i;
      }
    }
    return -1;
  }
}