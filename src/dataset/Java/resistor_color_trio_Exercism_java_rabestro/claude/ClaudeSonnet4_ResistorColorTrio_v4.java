import java.util.Map;

class ResistorColorTrio {
    private static final Map<String, Integer> COLOR_VALUES = Map.of(
            "black", 0, "brown", 1, "red", 2, "orange", 3, "yellow", 4,
            "green", 5, "blue", 6, "violet", 7, "grey", 8, "white", 9
    );

    String label(String[] colors) {
        int firstDigit = COLOR_VALUES.get(colors[0]);
        int secondDigit = COLOR_VALUES.get(colors[1]);
        int multiplierPower = COLOR_VALUES.get(colors[2]);
        
        long value = (firstDigit * 10L + secondDigit);
        
        if (multiplierPower >= 9) {
            return (value * pow10(multiplierPower - 9)) + " gigaohms";
        } else if (multiplierPower >= 6) {
            return (value * pow10(multiplierPower - 6)) + " megaohms";
        } else if (multiplierPower >= 3) {
            return (value * pow10(multiplierPower - 3)) + " kiloohms";
        } else {
            return (value * pow10(multiplierPower)) + " ohms";
        }
    }
    
    private static long pow10(int exp) {
        long result = 1;
        for (int i = 0; i < exp; i++) {
            result *= 10;
        }
        return result;
    }
}