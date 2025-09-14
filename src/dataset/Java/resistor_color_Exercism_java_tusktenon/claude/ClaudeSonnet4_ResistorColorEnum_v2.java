class ResistorColorEnum {
  private static final String[] COLOR_NAMES = {
    "black", "brown", "red", "orange", "yellow",
    "green", "blue", "violet", "grey", "white"
  };

  int colorCode(String color) {
    for (int i = 0; i < COLOR_NAMES.length; i++) {
      if (COLOR_NAMES[i].equals(color)) {
        return i;
      }
    }
    throw new IllegalArgumentException("Invalid color: " + color);
  }

  String[] colors() {
    return COLOR_NAMES.clone();
  }
}