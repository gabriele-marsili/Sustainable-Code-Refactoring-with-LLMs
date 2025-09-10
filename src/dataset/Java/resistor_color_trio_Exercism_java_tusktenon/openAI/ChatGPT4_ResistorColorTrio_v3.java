class ResistorColorTrio {
  private static enum Colors {
    black, brown, red, orange, yellow, green, blue, violet, grey, white
  }

  String label(String[] colors) {
    long r = resistance(colors);
    if (r < 1_000) return r + " ohms";
    if (r < 1_000_000) return (r / 1_000) + " kiloohms";
    if (r < 1_000_000_000) return (r / 1_000_000) + " megaohms";
    return (r / 1_000_000_000) + " gigaohms";
  }

  private static long resistance(String[] colors) {
    return (10L * Colors.valueOf(colors[0]).ordinal() + Colors.valueOf(colors[1]).ordinal()) 
           * (long) Math.pow(10, Colors.valueOf(colors[2]).ordinal());
  }
}