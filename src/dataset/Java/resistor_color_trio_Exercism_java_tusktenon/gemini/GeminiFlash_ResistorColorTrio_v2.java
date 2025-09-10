class ResistorColorTrio {
  private static final int[] colorValues = {0, 1, 2, 3, 4, 5, 6, 7, 8, 9};
  private static final String[] colorNames = {
    "black", "brown", "red", "orange", "yellow", "green", "blue", "violet", "grey", "white"
  };

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
    if (multiplier >= 0 && multiplier <= 9) {
      if (multiplier <= 5) {
        for (int i = 0; i < multiplier; i++) {
          r *= 10;
        }
      } else if (multiplier == 6) {
        r *= 1_000_000;
      } else if (multiplier == 7) {
        r *= 10_000_000;
      } else if (multiplier == 8) {
        r *= 100_000_000;
      } else {
        r *= 1_000_000_000;
      }
    }
    return r;
  }

  private static int valueOf(String color) {
    for (int i = 0; i < colorNames.length; i++) {
      if (colorNames[i].equals(color)) {
        return colorValues[i];
      }
    }
    return -1; // Handle invalid color (optional, depending on requirements)
  }
}