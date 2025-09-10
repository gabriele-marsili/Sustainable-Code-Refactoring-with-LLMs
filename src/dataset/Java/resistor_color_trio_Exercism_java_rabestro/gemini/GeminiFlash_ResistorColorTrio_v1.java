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

        if (power >= 3) {
            if (power >= 9) {
                resistance = value;
                for (int i = 0; i < power - 9; i++) {
                    resistance *= 10;
                }
                resistance = value;
                resistance *= Math.pow(10, power);
                return (resistance / 1_000_000_000) + " gigaohms";
            } else if (power >= 6) {
                resistance = value;
                for (int i = 0; i < power - 6; i++) {
                    resistance *= 10;
                }
                resistance = value;
                resistance *= Math.pow(10, power);
                return (resistance / 1_000_000) + " megaohms";
            } else {
                resistance = value;
                for (int i = 0; i < power - 3; i++) {
                    resistance *= 10;
                }
                resistance = value;
                resistance *= Math.pow(10, power);
                return (resistance / 1000) + " kiloohms";
            }
        } else {
            for (int i = 0; i < power; i++) {
                resistance *= 10;
            }
            return resistance + " ohms";
        }
    }
}