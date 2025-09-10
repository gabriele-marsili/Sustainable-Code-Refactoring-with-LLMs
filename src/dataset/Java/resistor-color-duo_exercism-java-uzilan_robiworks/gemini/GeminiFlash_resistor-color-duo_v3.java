class ResistorColorDuo {
    private static final java.util.Map<String, Integer> colorMap = java.util.Map.of(
            "black", 0, "brown", 1, "red", 2, "orange", 3, "yellow", 4,
            "green", 5, "blue", 6, "violet", 7, "grey", 8, "white", 9
    );

    int value(String[] colors) {
        return colorMap.get(colors[0]) * 10 + colorMap.get(colors[1]);
    }
}