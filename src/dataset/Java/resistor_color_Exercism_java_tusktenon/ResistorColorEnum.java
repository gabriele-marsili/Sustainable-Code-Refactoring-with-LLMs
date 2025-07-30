import java.util.Arrays;

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

  int colorCode(String color) {
    return Colors.valueOf(color).ordinal();
  }

  String[] colors() {
    return Arrays.stream(Colors.values()).map(Enum::toString).toArray(String[]::new);
  }
}
