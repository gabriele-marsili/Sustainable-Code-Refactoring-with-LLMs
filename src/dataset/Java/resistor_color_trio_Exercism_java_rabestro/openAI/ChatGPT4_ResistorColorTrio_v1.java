import java.util.List;

class ResistorColorTrio {
    private static final List<String> COLORS = List.of(
            "black", "brown", "red", "orange", "yellow",
            "green", "blue", "violet", "grey", "white"
    );

    String label(String[] colors) {
        int value = COLORS.indexOf(colors[0]) * 10 + COLORS.indexOf(colors[1]);
        long resistance = value * (long) Math.pow(10, COLORS.indexOf(colors[2]));

        if (resistance >= 1_000_000_000) {
            return (resistance / 1_000_000_000) + " gigaohms";
        } else if (resistance >= 1_000_000) {
            return (resistance / 1_000_000) + " megaohms";
        } else if (resistance >= 1000) {
            return (resistance / 1000) + " kiloohms";
        } else {
            return resistance + " ohms";
        }
    }
}