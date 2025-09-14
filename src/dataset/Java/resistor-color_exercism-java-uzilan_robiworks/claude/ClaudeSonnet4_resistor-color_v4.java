import java.util.Map;
import java.util.HashMap;

class ResistorColor {
    private static final String[] COLOR_ARRAY = {"black", "brown", "red", "orange", "yellow", "green", "blue", "violet", "grey", "white"};
    private static final Map<String, Integer> COLOR_MAP = createColorMap();
    
    private static Map<String, Integer> createColorMap() {
        Map<String, Integer> map = new HashMap<>(COLOR_ARRAY.length);
        for (int i = 0; i < COLOR_ARRAY.length; i++) {
            map.put(COLOR_ARRAY[i], i);
        }
        return map;
    }
    
    int colorCode(String color) {
        Integer result = COLOR_MAP.get(color.toLowerCase());
        return result != null ? result : -1;
    }

    String[] colors() {
        return COLOR_ARRAY.clone();
    }
}