import java.util.Map;
import java.util.HashMap;

class ResistorColor {
    private static final String[] RESISTOR_COLORS = {"black", "brown", "red", "orange", "yellow", "green", "blue", "violet", "grey", "white"};
    
    private static final Map<String, Integer> COLOR_CODE_MAP;
    
    static {
        COLOR_CODE_MAP = new HashMap<>(RESISTOR_COLORS.length);
        for (int i = 0; i < RESISTOR_COLORS.length; i++) {
            COLOR_CODE_MAP.put(RESISTOR_COLORS[i], i);
        }
    }

    int colorCode(String color) {
        return COLOR_CODE_MAP.getOrDefault(color, 0);
    }

    String[] colors() {
        return RESISTOR_COLORS.clone();
    }
}