class ResistorColorDuo {
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

  int value(String[] colors) {
    return 10 * valueOf(colors[0]) + valueOf(colors[1]);
  }

  private static int valueOf(String color) {
    return Colors.valueOf(color).ordinal();
  }
}
