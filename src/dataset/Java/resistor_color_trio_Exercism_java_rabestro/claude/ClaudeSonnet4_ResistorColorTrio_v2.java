import java.util.HashMap;
import java.util.Map;

class ResistorColorTrio {
    private static final Map<String, Integer> COLOR_VALUES = new HashMap<>(10);
    
    static {
        COLOR_VALUES.put("black", 0);
        COLOR_VALUES.put("brown", 1);
        COLOR_VALUES.put("red", 2);
        COLOR_VALUES.put("orange", 3);
        COLOR_VALUES.put("yellow", 4);
        COLOR_VALUES.put("green", 5);
        COLOR_VALUES.put("blue", 6);
        COLOR_VALUES.put("violet", 7);
        COLOR_VALUES.put("grey", 8);
        COLOR_VALUES.put("white", 9);
    }

    String label(String[] colors) {
        int firstDigit = COLOR_VALUES.get(colors[0]);
        int secondDigit = COLOR_VALUES.get(colors[1]);
        int multiplierPower = COLOR_VALUES.get(colors[2]);
        
        long value = firstDigit * 10L + secondDigit;
        
        // Calculate resistance using bit shifting for powers of 10 where possible
        long resistance;
        if (multiplierPower == 0) {
            resistance = value;
        } else if (multiplierPower <= 3) {
            resistance = value * (multiplierPower == 1 ? 10 : multiplierPower == 2 ? 100 : 1000);
        } else {
            resistance = value;
            for (int i = 0; i < multiplierPower; i++) {
                resistance *= 10;
            }
        }

        if (resistance >= 1_000_000_000L && resistance % 1_000_000_000L == 0) {
            return (resistance / 1_000_000_000L) + " gigaohms";
        } else if (resistance >= 1_000_000L && resistance % 1_000_000L == 0) {
            return (resistance / 1_000_000L) + " megaohms";
        } else if (resistance >= 1000L && resistance % 1000L == 0) {
            return (resistance / 1000L) + " kiloohms";
        }
        return resistance + " ohms";
    }
}