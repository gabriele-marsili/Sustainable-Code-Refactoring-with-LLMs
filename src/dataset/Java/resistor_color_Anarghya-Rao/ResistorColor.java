class ResistorColor {
    private static final String[] RESISTOR_COLORS = {"black", "brown", "red", "orange", "yellow", "green", "blue", "violet", "grey", "white"};

    int colorCode(String color) {
        int code = 0;

        for (int i = 0; i < RESISTOR_COLORS.length; i++) {
            if(RESISTOR_COLORS[i].equals(color)) {
                code = i;
                break;
            }
        }

        return code;
    }

    String[] colors() {
        return RESISTOR_COLORS;
    }
}
