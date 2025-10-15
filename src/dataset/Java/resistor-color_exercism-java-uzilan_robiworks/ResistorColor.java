class ResistorColor {
    int colorCode(String color) {
        color = color.toLowerCase();
        String[] colorsList = colors();
        for (int i = 0; i < colorsList.length; i++) {
            if (colorsList[i] == color) {
                return i;
            }
        }
        return -1;
    }

    String[] colors() {
        String[] ColorBands = new String[] {"black", "brown", "red", "orange", "yellow", "green", "blue", "violet", "grey", "white"};
        return ColorBands;
    }
}
