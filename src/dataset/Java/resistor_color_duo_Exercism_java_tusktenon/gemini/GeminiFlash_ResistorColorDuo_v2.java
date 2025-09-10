class ResistorColorDuo {

  private static final int[] colorValues = {0, 1, 2, 3, 4, 5, 6, 7, 8, 9};

  int value(String[] colors) {
    return 10 * colorValue(colors[0]) + colorValue(colors[1]);
  }

  private static int colorValue(String color) {
    switch (color) {
      case "black": return colorValues[0];
      case "brown": return colorValues[1];
      case "red": return colorValues[2];
      case "orange": return colorValues[3];
      case "yellow": return colorValues[4];
      case "green": return colorValues[5];
      case "blue": return colorValues[6];
      case "violet": return colorValues[7];
      case "grey": return colorValues[8];
      case "white": return colorValues[9];
      default: return 0;
    }
  }
}