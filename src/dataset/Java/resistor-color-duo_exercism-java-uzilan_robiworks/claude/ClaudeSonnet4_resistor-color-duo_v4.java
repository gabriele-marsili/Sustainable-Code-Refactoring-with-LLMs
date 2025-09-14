import java.util.Map;
import java.util.HashMap;

class ResistorColorDuo {
    private static final Map<String, Integer> COLOR_VALUES = new HashMap<>();
    
    static {
        COLOR_VALUES.put("black", 0);
        COLOR_VALUES.put("brown", 1);
        COLOR_VALUES.put("red", 2);
        COLOR_VALUES.put("orange", 3);
        COLOR_VALUES.put("yellow", 4);
        COLOR_VALUES.put("green", 5);
        COLOR_VALUES.put("blue", 6);
        COLOR_VALUES.put("violet", 7);
        COLOR_VALUES.put("grey", 8);
        COLOR_VALUES.put("white", 9);
    }
    
    int value(String[] colors) {
        return COLOR_VALUES.get(colors[0]) * 10 + COLOR_VALUES.get(colors[1]);
    }
}