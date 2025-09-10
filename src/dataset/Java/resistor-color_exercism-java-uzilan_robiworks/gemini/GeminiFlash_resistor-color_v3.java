class ResistorColor {
    private static final String[] COLOR_BANDS = {"black", "brown", "red", "orange", "yellow", "green", "blue", "violet", "grey", "white"};

    int colorCode(String color) {
        color = color.toLowerCase();
        for (int i = 0; i < COLOR_BANDS.length; i++) {
            if (COLOR_BANDS[i].equals(color)) {
                return i;
            }
        }
        return -1;
    }

    String[] colors() {
        return COLOR_BANDS;
    }
}