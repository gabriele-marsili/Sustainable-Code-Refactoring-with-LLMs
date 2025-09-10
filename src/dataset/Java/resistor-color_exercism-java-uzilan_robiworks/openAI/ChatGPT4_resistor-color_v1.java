import java.util.Map;

class ResistorColor {
    private static final Map<String, Integer> COLOR_MAP = Map.of(
        "black", 0, "brown", 1, "red", 2, "orange", 3, "yellow", 4,
        "green", 5, "blue", 6, "violet", 7, "grey", 8, "white", 9
    );

    int colorCode(String color) {
        return COLOR_MAP.getOrDefault(color.toLowerCase(), -1);
    }

    String[] colors() {
        return COLOR_MAP.keySet().toArray(new String[0]);
    }
}