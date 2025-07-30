class ResistorColorTrio {
  private static enum Colors {
    black,
    brown,
    red,
    orange,
    yellow,
    green,
    blue,
    violet,
    grey,
    white
  }

  String label(String[] colors) {
    final long r = resistance(colors);
    if (r < 1000) return r + " ohms";
    if (r < 1_000_000) return r / 1000 + " kiloohms";
    if (r < 1_000_000_000) return r / 1_000_000 + " megaohms";
    return r / 1_000_000_000 + " gigaohms";
  }

  private static long resistance(String[] colors) {
    long r = 10 * valueOf(colors[0]) + valueOf(colors[1]);
    for (int i = 0; i < valueOf(colors[2]); i++) {
      r *= 10;
    }
    return r;
  }

  private static int valueOf(String color) {
    return Colors.valueOf(color).ordinal();
  }
}
