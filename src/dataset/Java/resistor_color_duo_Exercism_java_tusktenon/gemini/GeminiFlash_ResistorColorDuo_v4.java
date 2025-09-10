class ResistorColorDuo {
  private static final int[] colorValues = {0, 1, 2, 3, 4, 5, 6, 7, 8, 9};
  private static final String[] colorNames = {"black", "brown", "red", "orange", "yellow", "green", "blue", "violet", "grey", "white"};

  int value(String[] colors) {
    return 10 * getValue(colors[0]) + getValue(colors[1]);
  }

  private static int getValue(String color) {
    for (int i = 0; i < colorNames.length; i++) {
      if (colorNames[i].equals(color)) {
        return colorValues[i];
      }
    }
    return -1; // Or throw an exception if invalid color should not be tolerated.
  }
}