class ResistorColorTrio {
  private static final String[] COLORS = {
    "black", "brown", "red", "orange", "yellow", 
    "green", "blue", "violet", "grey", "white"
  };

  String label(String[] colors) {
    final long r = resistance(colors);
    if (r < 1000) return r + " ohms";
    if (r < 1_000_000) return (r / 1000) + " kiloohms";
    if (r < 1_000_000_000) return (r / 1_000_000) + " megaohms";
    return (r / 1_000_000_000) + " gigaohms";
  }

  private static long resistance(String[] colors) {
    return (10 * valueOf(colors[0]) + valueOf(colors[1])) * (long) Math.pow(10, valueOf(colors[2]));
  }

  private static int valueOf(String color) {
    for (int i = 0; i < COLORS.length; i++) {
      if (COLORS[i].equals(color)) return i;
    }
    throw new IllegalArgumentException("Invalid color: " + color);
  }
}