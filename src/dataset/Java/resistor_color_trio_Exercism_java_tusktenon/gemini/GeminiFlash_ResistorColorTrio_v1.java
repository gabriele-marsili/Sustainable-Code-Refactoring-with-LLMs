class ResistorColorTrio {
  private static final int[] COLOR_VALUES = {0, 1, 2, 3, 4, 5, 6, 7, 8, 9};
  private static final String[] COLOR_NAMES = {
    "black", "brown", "red", "orange", "yellow", "green", "blue", "violet", "grey", "white"
  };

  String label(String[] colors) {
    long r = resistance(colors);
    if (r < 1000) return r + " ohms";
    if (r < 1_000_000) return r / 1000 + " kiloohms";
    if (r < 1_000_000_000) return r / 1_000_000 + " megaohms";
    return r / 1_000_000_000 + " gigaohms";
  }

  private long resistance(String[] colors) {
    int firstDigit = colorValue(colors[0]);
    int secondDigit = colorValue(colors[1]);
    int multiplier = colorValue(colors[2]);

    long r = (long) (firstDigit * 10 + secondDigit);
    if (multiplier < 10) {
        for (int i = 0; i < multiplier; i++) {
            r *= 10;
        }
    } else {
        r = 0;
    }
    return r;
  }

  private int colorValue(String color) {
    for (int i = 0; i < COLOR_NAMES.length; i++) {
      if (COLOR_NAMES[i].equals(color)) {
        return COLOR_VALUES[i];
      }
    }
    return -1; // Handle invalid color (though the problem doesn't specify this)
  }
}