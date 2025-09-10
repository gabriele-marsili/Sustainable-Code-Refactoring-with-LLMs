import java.util.List;

class ResistorColorTrio {
    private static final List<String> COLORS = List.of(
            "black", "brown", "red", "orange", "yellow",
            "green", "blue", "violet", "grey", "white"
    );

    String label(String[] colors) {
        int value = COLORS.indexOf(colors[0]) * 10 + COLORS.indexOf(colors[1]);
        int power = COLORS.indexOf(colors[2]);
        long resistance = value;

        if (power > 0) {
            if (power <= 5) {
                for (int i = 0; i < power; i++) {
                    resistance *= 10;
                }
            } else {
                resistance = value;
                for (int i = 0; i < power; i++) {
                    resistance *= 10;
                }
            }
        }

        String unit = "ohms";
        if (resistance >= 1_000_000_000) {
            unit = "gigaohms";
            resistance /= 1_000_000_000;
        } else if (resistance >= 1_000_000) {
            unit = "megaohms";
            resistance /= 1_000_000;
        } else if (resistance >= 1000) {
            resistance /= 1000;
            unit = "kiloohms";
        }
        return resistance + " " + unit;
    }
}