import java.util.Map;
import java.util.HashMap;

class ResistorColor {
    private static final Map<String, Integer> colorMap = createColorMap();

    private static Map<String, Integer> createColorMap() {
        String[] colors = {"black", "brown", "red", "orange", "yellow", "green", "blue", "violet", "grey", "white"};
        Map<String, Integer> map = new HashMap<>();
        for (int i = 0; i < colors.length; i++) {
            map.put(colors[i], i);
        }
        return map;
    }

    int colorCode(String color) {
        return colorMap.getOrDefault(color.toLowerCase(), -1);
    }

    String[] colors() {
        return colorMap.keySet().toArray(new String[0]);
    }
}