import java.util.Map;
import java.util.HashMap;

class ResistorColor {
    private static final Map<String, Integer> COLOR_MAP = createColorMap();

    int colorCode(String color) {
        return COLOR_MAP.getOrDefault(color.toLowerCase(), -1);
    }

    String[] colors() {
        return COLOR_MAP.keySet().toArray(new String[0]);
    }

    private static Map<String, Integer> createColorMap() {
        String[] colorBands = {"black", "brown", "red", "orange", "yellow", "green", "blue", "violet", "grey", "white"};
        Map<String, Integer> map = new HashMap<>();
        for (int i = 0; i < colorBands.length; i++) {
            map.put(colorBands[i], i);
        }
        return map;
    }
}