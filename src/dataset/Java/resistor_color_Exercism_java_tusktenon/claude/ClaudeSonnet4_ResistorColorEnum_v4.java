import java.util.HashMap;
import java.util.Map;

class ResistorColorEnum {
  private static final String[] COLOR_NAMES = {
    "black", "brown", "red", "orange", "yellow",
    "green", "blue", "violet", "grey", "white"
  };
  
  private static final Map<String, Integer> COLOR_CODE_MAP = new HashMap<>();
  
  static {
    for (int i = 0; i < COLOR_NAMES.length; i++) {
      COLOR_CODE_MAP.put(COLOR_NAMES[i], i);
    }
  }

  int colorCode(String color) {
    Integer code = COLOR_CODE_MAP.get(color);
    return code != null ? code : -1;
  }

  String[] colors() {
    return COLOR_NAMES.clone();
  }
}