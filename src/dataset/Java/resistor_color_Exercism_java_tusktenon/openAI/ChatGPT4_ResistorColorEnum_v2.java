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

  private static final String[] COLOR_NAMES = new String[Colors.values().length];
  
  static {
    for (Colors color : Colors.values()) {
      COLOR_NAMES[color.ordinal()] = color.name();
    }
  }

  int colorCode(String color) {
    return Colors.valueOf(color).ordinal();
  }

  String[] colors() {
    return COLOR_NAMES.clone();
  }
}