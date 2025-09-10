class ResistorColorEnum {
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

  private static final String[] COLOR_NAMES = Arrays.stream(Colors.values())
                                                    .map(Enum::name)
                                                    .toArray(String[]::new);

  int colorCode(String color) {
    return Colors.valueOf(color).ordinal();
  }

  String[] colors() {
    return COLOR_NAMES.clone();
  }
}