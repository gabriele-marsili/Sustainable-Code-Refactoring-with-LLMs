class ResistorColorDuo {
  private static final int[] colorValues = {
    0, // black
    1, // brown
    2, // red
    3, // orange
    4, // yellow
    5, // green
    6, // blue
    7, // violet
    8, // grey
    9  // white
  };

  private static final String[] colorNames = {
    "black",
    "brown",
    "red",
    "orange",
    "yellow",
    "green",
    "blue",
    "violet",
    "grey",
    "white"
  };

  int value(String[] colors) {
    return 10 * getValue(colors[0]) + getValue(colors[1]);
  }

  private static int getValue(String color) {
    for (int i = 0; i < colorNames.length; i++) {
      if (colorNames[i].equals(color)) {
        return colorValues[i];
      }
    }
    return -1; // Or throw an exception if invalid color is not acceptable
  }
}