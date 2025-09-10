class ResistorColorDuo {
    int value(String[] colors) {
        return getColorCode(colors[0]) * 10 + getColorCode(colors[1]);
    }

    private int getColorCode(String color) {
        switch (color) {
            case "black": return 0;
            case "brown": return 1;
            case "red": return 2;
            case "orange": return 3;
            case "yellow": return 4;
            case "green": return 5;
            case "blue": return 6;
            case "violet": return 7;
            case "grey": return 8;
            case "white": return 9;
            default: return -1; // Or throw an exception for invalid color
        }
    }
}