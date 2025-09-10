import java.util.Map;
import java.util.HashMap;

class ResistorColor {
    private static final String[] RESISTOR_COLORS = {"black", "brown", "red", "orange", "yellow", "green", "blue", "violet", "grey", "white"};
    private static final Map<String, Integer> COLOR_CODE_MAP = createColorCodeMap();

    private static Map<String, Integer> createColorCodeMap() {
        Map<String, Integer> map = new HashMap<>();
        for (int i = 0; i < RESISTOR_COLORS.length; i++) {
            map.put(RESISTOR_COLORS[i], i);
        }
        return map;
    }

    int colorCode(String color) {
        return COLOR_CODE_MAP.getOrDefault(color, -1);
    }

    String[] colors() {
        return RESISTOR_COLORS.clone();
    }
}