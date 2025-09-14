import java.util.Arrays;
import java.util.List;

class ResistorColorTrio {
    private static final List<String> COLORS = List.of(
            "black", "brown", "red", "orange", "yellow",
            "green", "blue", "violet", "grey", "white"
    );
    
    private static final long[] POWERS_OF_10 = {
        1L, 10L, 100L, 1_000L, 10_000L, 100_000L, 1_000_000L, 
        10_000_000L, 100_000_000L, 1_000_000_000L
    };

    String label(String[] colors) {
        int firstDigit = COLORS.indexOf(colors[0]);
        int secondDigit = COLORS.indexOf(colors[1]);
        int multiplierIndex = COLORS.indexOf(colors[2]);
        
        int value = firstDigit * 10 + secondDigit;
        long resistance = value * POWERS_OF_10[multiplierIndex];

        if (resistance >= 1_000_000_000L) {
            return (resistance / 1_000_000_000L) + " gigaohms";
        } else if (resistance >= 1_000_000L) {
            return (resistance / 1_000_000L) + " megaohms";
        } else if (resistance >= 1000L) {
            return (resistance / 1000L) + " kiloohms";
        }
        return resistance + " ohms";
    }
}