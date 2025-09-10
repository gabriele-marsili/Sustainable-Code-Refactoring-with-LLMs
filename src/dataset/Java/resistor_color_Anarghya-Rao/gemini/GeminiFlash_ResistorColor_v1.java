import java.util.HashMap;
import java.util.Map;

class ResistorColor {
    private static final String[] RESISTOR_COLORS = {"black", "brown", "red", "orange", "yellow", "green", "blue", "violet", "grey", "white"};
    private static final Map<String, Integer> COLOR_MAP = new HashMap<>();

    static {
        for (int i = 0; i < RESISTOR_COLORS.length; i++) {
            COLOR_MAP.put(RESISTOR_COLORS[i], i);
        }
    }

    int colorCode(String color) {
        return COLOR_MAP.getOrDefault(color, 0);
    }

    String[] colors() {
        return RESISTOR_COLORS;
    }
}