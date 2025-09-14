import java.util.Map;
import java.util.HashMap;

class ResistorColor {
    private static final String[] COLOR_BANDS = {"black", "brown", "red", "orange", "yellow", "green", "blue", "violet", "grey", "white"};
    private static final Map<String, Integer> COLOR_MAP = new HashMap<>();
    
    static {
        for (int i = 0; i < COLOR_BANDS.length; i++) {
            COLOR_MAP.put(COLOR_BANDS[i], i);
        }
    }
    
    int colorCode(String color) {
        Integer code = COLOR_MAP.get(color.toLowerCase());
        return code != null ? code : -1;
    }

    String[] colors() {
        return COLOR_BANDS.clone();
    }
}