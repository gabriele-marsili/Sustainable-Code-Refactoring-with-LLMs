import java.util.Arrays;
import java.util.HashMap;
import java.util.Map;

class ResistorColorEnum {

  private static final Map<String, Integer> colorMap = new HashMap<>();
  private static final String[] colorArray;

  static {
    Colors[] colors = Colors.values();
    colorArray = new String[colors.length];
    for (int i = 0; i < colors.length; i++) {
      colorMap.put(colors[i].name(), i);
      colorArray[i] = colors[i].name();
    }
  }

  private enum Colors {
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
    return colorMap.get(color);
  }

  String[] colors() {
    return Arrays.copyOf(colorArray, colorArray.length);
  }
}